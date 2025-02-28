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
    const { gameName, url, xProfile, description, turnstileToken } = body

    const verifyTurnstile = await verifyTurnstileToken(turnstileToken)
    if (!verifyTurnstile.success) {
      throw new Error('Turnstile verification failed')
    }

    // TODO:
    // 1. check if game url is not added yet
    // 2. check if website is accessible
    // 3. check if x profile is accessible
    // 4. take screenshot of the game site and upload to storage (supabase/vercel) ✅
    // 5. insert game into database ✅

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
