import puppeteer from "puppeteer";

export default defineEventHandler(async (event) => {
  const { url } = await readBody(event);
  if (!url) return [null, "Please enter a valid url"];
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    let { origin, hostname: domain, pathname } = new URL(url);
    await page.goto(url);
    // Get Title
    const title = await page.evaluate(() => {
      return (
        document.querySelector("title")?.innerText ||
        document
          .querySelector('meta[name="og:title"]')
          ?.getAttribute("content") ||
        document
          .querySelector('meta[name="twitter:title"]')
          ?.getAttribute("content") ||
        null
      );
    });
    // Get Description
    const description = await page.evaluate(() => {
      const element: any =
        document.querySelector('meta[name="description"]') ||
        document.querySelector('meta[name="og:description"]') ||
        document.querySelector('meta[name="twitter:description"]') ||
        document.querySelector('meta[property="description"]') ||
        document.querySelector('meta[property="og:description"]') ||
        document.querySelector('meta[property="twitter:description"]');
      if (!element) return null;
      return element.getAttribute("content");
    });
    // Get Image
    const image = await page.evaluate(() => {
      const element: any =
        document.querySelector('meta[name="image"]') ||
        document.querySelector('meta[name="og:image"]') ||
        document.querySelector('meta[name="twitter:image"]') ||
        document.querySelector('meta[property="image"]') ||
        document.querySelector('meta[property="og:image"]') ||
        document.querySelector('meta[property="twitter:image"]');
      if (!element) return null;
      return element.getAttribute("content");
    });
    // Get Sitename
    const name = await page.evaluate(() => {
      const element: any =
        document.querySelector('meta[name="site_name"]') ||
        document.querySelector('meta[name="og:site_name"]') ||
        document.querySelector('meta[name="twitter:site_name"]') ||
        document.querySelector('meta[property="site_name"]') ||
        document.querySelector('meta[property="og:site_name"]') ||
        document.querySelector('meta[property="twitter:site_name"]');
      if (!element) return null;
      return element.getAttribute("content");
    });
    // Get Favicon
    let favicon = await page.evaluate(() => {
      const element: any =
        document.querySelector('link[rel="shortcut icon"]') ||
        document.querySelector('link[rel="icon"]');
      if (!element) return null;
      return element.getAttribute("href");
    });
    favicon = !favicon
      ? `https://t2.gstatic.com/faviconV2?client=SOCIAL&type=FAVICON&fallback_opts=TYPE,SIZE,URL&url=${origin}&size=64`
      : !favicon.includes("://")
      ? `${origin}${favicon}`
      : favicon;
    return [
      { name, origin, domain, title, description, image, favicon, pathname },
      null,
    ];
  } catch (error: any) {
    console.log(error);
    return [null, error.code];
  } finally {
    browser.close();
  }
});
