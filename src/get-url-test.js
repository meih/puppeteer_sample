const puppeteer = require('puppeteer');

(async () => {
  const url = process.argv[2] ? process.argv[2] : 'https://github.com/meih'
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url)

  const hrefs = await page.evaluate(() => {
    let a_href = []
    const hrefs = document.querySelectorAll('a')
    hrefs.forEach(a => a_href.push(a.href))
    return a_href
  });

  // beware of emitter.setMaxListeners()
  for (let href of hrefs) {
    await sub(href)
  }

  await browser.close();
})();

async function sub(url) {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url)

  const images = await page.evaluate(() => {
    let image_src = []
    const images = document.querySelectorAll('img')
    images.forEach(img => image_src.push(img.src))
    return image_src
  });

  console.log(images)
}
