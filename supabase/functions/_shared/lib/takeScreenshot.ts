const SCREENSHOTONE_ACCESS_KEY = Deno.env.get('SCREENSHOTONE_ACCESS_KEY')

export async function takeScreenshot(url: string) {
  const params = new URLSearchParams({
    access_key: SCREENSHOTONE_ACCESS_KEY,
    url: url,
    format: 'jpg',
    block_ads: 'true',
    block_cookie_banners: 'true',
    block_banners_by_heuristics: 'false',
    block_trackers: 'true',
    delay: '3',
    timeout: '60',
    response_type: 'by_format',
    image_quality: '80'
  })
  const queryParams = params.toString()

  const response = await fetch(`https://api.screenshotone.com/take?${queryParams}`)

  const blob = await response.blob()

  return blob
}
