import { corsHeaders } from '../_shared/utils/cors.ts'
import { tryCatch } from '../_shared/utils/tryCatch.ts'
import { supabaseAdmin } from '../_shared/lib/supabaseAdmin.ts'
import { verifyTurnstileToken } from '../_shared/lib/verifyTurnstileToken.ts'
import { takeScreenshot } from '../_shared/lib/takeScreenshot.ts'
import { storeScreenshot } from '../_shared/lib/storeScreenshot.ts'

interface GameSubmission {
  gameName: string
  url: string
  xProfile: string
  description: string
  turnstileToken: string
  slug: string
}

Deno.serve(async (req) => {
  // Handle CORS
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    // Only allow POST requests
    if (req.method !== 'POST') {
      throw new Error('Method not allowed')
    }

    // Parse the request body
    const body: GameSubmission = await req.json()
    const { gameName, url, xProfile, description, turnstileToken, slug } = body

    const verifyTurnstile = await verifyTurnstileToken(turnstileToken)
    if (!verifyTurnstile.success) {
      throw new Error('Turnstile verification failed. Please close and reopen the modal or refresh the page.')
    }

    // Check if the game URL or slug is already in the database
    const existingGameByUrl = await supabaseAdmin
      .from('games')
      .select('id')
      .eq('url', url)
      .maybeSingle()
    if (existingGameByUrl.data) {
      throw new Error('Game URL already exists')
    }

    const existingGameBySlug = await supabaseAdmin
      .from('games')
      .select('id')
      .eq('slug', slug)
      .maybeSingle()
    if (existingGameBySlug.data) {
      throw new Error('Game slug already exists')
    }

    // Check if URL is not 404
    const gameUrl = await tryCatch(fetch(url))
    if (gameUrl.error || !gameUrl.data?.ok) {
      throw new Error('Game URL is not accessible')
    }

    // TODO: turns out it's not that simple to check if the X profile exists/not
    // Check if X profile is not 404
    // const xProfileUrl = await fetch(`https://x.com/${xProfile}`)
    // if (!xProfileUrl.ok) {
    //   throw new Error('X profile is not accessible')
    // }

    // Take screenshot of the game site
    let imageUrl = ''
    try {
      const screenshot = await takeScreenshot(url)
      if (screenshot.type === 'application/json') {
        // Transform the blob to string to read the error message
        const errorText = await screenshot.text()
        console.error(`Error taking screenshot: ${errorText}`)
        throw new Error('Error taking screenshot')
      }

      const hostname = new URL(url).hostname
      const image = await storeScreenshot({
        imageBlob: screenshot,
        filepath: `games/${hostname}.jpg`,
      })
      imageUrl = image.publicUrl
    } catch (error) {
      console.error('Error taking screenshot:', error)
    }

    // Insert the game into the database
    const { data, error } = await supabaseAdmin
      .from('games')
      .insert([
        {
          title: gameName,
          url,
          description,
          slug,
          images: imageUrl ? [imageUrl] : [],
          author: {
            name: xProfile,
            profile_url: `https://x.com/${xProfile}`,
            avatar: `https://unavatar.io/twitter/${xProfile}`,
          },
        },
      ])
      .select()
      .single()

    if (error) throw error

    return new Response(
      JSON.stringify({ success: true, data }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      }
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ success: false, error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      }
    )
  }
}) 
