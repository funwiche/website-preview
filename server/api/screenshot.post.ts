import puppeteer from "puppeteer";
import { KnownDevices } from "puppeteer";
import fs from "fs";
import path from "path";
const devices: any = {
  mobile: KnownDevices["iPhone XR"],
  tablet: KnownDevices["iPad Mini"],
  desktop: KnownDevices["iPad Pro 11 landscape"],
};

export default defineEventHandler(async (event) => {
  const directory = "server/public/screenshots";
  if (!fs.existsSync(directory)) fs.mkdirSync(directory);
  fs.readdir(directory, (err, files) => {
    if (err) throw err;
    for (const file of files) {
      fs.unlink(path.join(directory, file), (err) => {
        if (err) throw err;
      });
    }
  });
  const { url, device, fullPage } = await readBody(event);
  let { hostname } = new URL(url);
  const filepath = `/screenshots/${device}${
    fullPage ? ".fullscreen" : ""
  }.${hostname}.png`;
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  try {
    await page.emulate(devices[device]);
    await page.goto(url);
    await page.screenshot({ path: `server/public${filepath}`, fullPage });
    new Promise((r) => setTimeout(r, 2000));
    return [{ screenshot: filepath }, null];
  } catch (error) {
    console.log(error);
    return [null, "Internal server error"];
  } finally {
    browser.close();
  }
});
