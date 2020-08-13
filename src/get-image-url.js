const puppeteer = require('puppeteer');

(async () => {
  const url = 'https://github.com/meih'
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url)

  const result = await page.evaluate(() => {
    let image_src = []
    const images = document.querySelectorAll('img')
    images.forEach(img => image_src.push(img.src))
    return image_src
  });

  console.log('Result:', result);

  await browser.close();
})();

