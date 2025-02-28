const CF_ACCOUNT_ID = Deno.env.get('CF_ACCOUNT_ID')
const CF_BROWSER_RENDERING_API_KEY = Deno.env.get('CF_BROWSER_RENDERING_API_KEY')

export async function takeScreenshot(url: string) {
  const response = await fetch(`https://api.cloudflare.com/client/v4/accounts/${CF_ACCOUNT_ID}/browser-rendering/screenshot`, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${CF_BROWSER_RENDERING_API_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      url,
      screenshotOptions: {
        fullPage: true,
        omitBackground: true,
      },
      viewport: {
        width: 1280,
        height: 720,
      },
      gotoOptions: {
        waitUntil: 'networkidle0',
        timeout: 15000,
      },
    }),
  })

  const blob = await response.blob()

  return blob
}

(async () => {
  const result = await takeScreenshot('https://www.google.com')
  console.log('result:', result);
})()
