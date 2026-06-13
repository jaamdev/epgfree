import fs from 'node:fs/promises'
import puppeteer from 'puppeteer'

(async () => {
  console.time('Tiempo')
  console.log('Scraper On:', new Date().toLocaleString())
  await new Promise(t => setTimeout(t, 1000 + Math.random() * 3000))

  const browser = await puppeteer.launch({
    headless: true,
    slowMo: 1000,
    defaultViewport: { width: 1920, height: 1080 },
    args: [
      '--no-sandbox',
      '--disable-setuid-sandbox',
      '--start-maximized',
      '--user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/147.0.0.0 Safari/537.36'
    ]
  })

  const page = await browser.newPage()

  await page.goto('https://store.epicgames.com/es-ES/free-games', { waitUntil: 'networkidle2' })

  await new Promise(t => setTimeout(t, 1000 + Math.random() * 3000))

  const result = await page.evaluate(() => {
    const getNodeList = () => {
      const vaultNodes = document.querySelectorAll('[data-component="VaultOfferCard"]')
      const freeNodes = document.querySelectorAll('[data-component="FreeOfferCard"]')
      return vaultNodes.length > 0 ? vaultNodes : freeNodes
    }

    const nodeList = getNodeList()
    const games = []
    const epicUrl = 'https://store.epicgames.com'

    for (let i = 0; i < nodeList.length; i++) {
      const element = nodeList[i]
      const urlImg = element.querySelector('img')?.getAttribute('src') || ''
      const pathname = element.querySelector('a')?.getAttribute('href') || ''
      const titleGame = element.querySelector('h6')?.textContent || ''
      const currentFree = element.querySelector('span')?.textContent.toLowerCase() === 'gratis ahora'
      const currentFreeText = element.querySelector('span')?.textContent || ''
      const dateTime = element.querySelector('time')?.getAttribute('datetime') || ''
      const dateInMiliseconds = new Date(dateTime).getTime()
      const urlGame = epicUrl + pathname

      const result = {
        urlImg,
        urlGame,
        titleGame,
        currentFree,
        currentFreeText,
        dateTime,
        dateInMiliseconds
      }

      games.push(result)
    }

    return games.filter(game => game.titleGame.length > 0)
  })

  await new Promise(t => setTimeout(t, 1000 + Math.random() * 3000))

  if (result.length > 0) {
    await fs.writeFile('src/db/db.json', JSON.stringify(result, null, 2))
  }

  await browser.close()

  console.timeEnd('Tiempo')
  console.log('Scraper Off:', new Date().toLocaleString())
})()
