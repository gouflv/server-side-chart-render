const pptr = require("puppeteer");

/**
 * Launches a browser and captures pages that opened by the url of urlList
 *
 * @param {string[]} urlList
 * @returns Buffer[]
 */
async function capturePages(urlList) {
  const browser = await pptr.launch();

  const result = [];
  for (const url of urlList) {
    const buffer = await newPageAndCapture(url);
    result.push(buffer);
  }

  browser.close();

  return result;
}

async function newPageAndCapture(url) {
  const page = await browser.newPage();
  await page.goto(url, {
    waitUntil: "networkidle0",
  });
  await page.waitForSelector("canvas");
  const el = await page.$("canvas");
  const buffer = await el.screenshot({ type: "jpeg", quality: 80 });

  page.close();

  return buffer;
}

module.exports = {
  capturePageToFile: capturePages,
};
