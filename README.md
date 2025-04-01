import { chromium, Browser, Page, BrowserContext } from 'playwright'

const page3 = ''

async function scrollAndClick(currentPage = page3) {
  const chromePath =
    '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  const browser: Browser = await chromium.launch({
    headless: false,
    executablePath: chromePath,
    args: ['--incognito'],
  })

  const context = await browser.newContext({})
  const totalLoops = 9999999999
  for (let i = 1; i <= totalLoops; i++) {
    console.log(`Bắt đầu lần lặp thứ ${i}/${totalLoops}...`)
    context
    const page: Page = await context.newPage()
    console.log(`Đang tải trang... ${new Date().toLocaleString()}`)
    await page.goto(currentPage, { timeout: 0 })
    await page.waitForTimeout(5000)
    console.log('Đang tìm element với id vPlayerv2...')
    const elementSelector = '#vPlayerv2'

    await page.locator('#context-stats').click({ timeout: 0 })

    await page.waitForSelector(elementSelector, { timeout: 10000 })

    // Scroll đến element
    await page.evaluate((selector) => {
      const element = document.querySelector(selector)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'center' })
      }
    }, elementSelector)

    // Đợi một chút để đảm bảo scroll hoàn tất
    await page.waitForTimeout(5000)
    console.log(`${new Date().toLocaleString()}`)
    await page.evaluate(() => {
      window.scrollBy({
        top: -200,
        behavior: 'smooth',
      })
    })
    await page.waitForTimeout(1000)
    await page.evaluate(() => {
      window.scrollBy({
        top: 200,
        behavior: 'smooth',
      })
    })
    const durationText = await page
      .locator('.ThanhNienPlayer-duration .duration-display')
      .textContent()
    let time = 140000
    if (durationText) {
      const duration = durationText.replace(/^Duration/, '').trim()
      console.log('Duration:', duration)
      const [minutes, seconds] = duration.split(':').map(Number)
      const totalMilliseconds = (minutes * 60 + seconds) * 1000
      time = totalMilliseconds - 1500
    }

    await page.waitForTimeout(time)
    await page.close()
  }

  await context.close()
  await browser.close()
}

;[page3].forEach(scrollAndClick)
