const TURNSTILE_SECRET_KEY = Deno.env.get('TURNSTILE_SECRET_KEY')

export async function verifyTurnstileToken(turnstileToken: string) {
  const turnstileVerification = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      secret: TURNSTILE_SECRET_KEY,
      response: turnstileToken,
    }),
  })

  const turnstileResult = await turnstileVerification.json()

  return { success: turnstileResult.success }
}
