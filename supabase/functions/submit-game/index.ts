import { corsHeaders } from '../_shared/utils/cors.ts'
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
      throw new Error('Turnstile verification failed')
    }

    // Check if the game URL or slug is already in the database
    const existingGame = await supabaseAdmin
      .from('games')
      .select('id')
      .or(`url.eq.${url}, slug.eq.${slug}`)
      .maybeSingle()
    if (existingGame.data) {
      throw new Error('Game URL or slug already exists')
    }
    if (existingGame.error) {
      throw new Error('Error checking if game is already added')
    }

    // Check if URL is not 404
    const gameUrl = await fetch(url)
    if (!gameUrl.ok) {
      throw new Error('Game URL is not accessible')
    }

    // Check if X profile is not 404
    const xProfileUrl = await fetch(`https://x.com/${xProfile}`)
    if (!xProfileUrl.ok) {
      throw new Error('X profile is not accessible')
    }

    // Take screenshot of the game site
    const screenshot = await takeScreenshot(url)
    const hostname = new URL(url).hostname
    const image = await storeScreenshot({
      imageBlob: screenshot,
      filepath: `games/${hostname}.jpg`,
    })

    // Insert the game into the database
    const { data, error } = await supabaseAdmin
      .from('games')
      .insert([
        {
          title: gameName,
          url,
          description,
          images: [image.publicUrl],
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
