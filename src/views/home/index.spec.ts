import puppeteer, { Browser, Page } from "puppeteer";

describe("home 页面测试", () => {
  let browser: Browser;
  let page: Page;

  beforeAll(async () => {
    browser = await puppeteer.launch({
      executablePath: process.env.ChromePath,
      headless: true,
    });
    page = await browser.newPage();
  });

  afterAll(async () => {
    await page.close();
  });

  it("test home page", async () => {
    await page.goto("http://localhost:8080/");
    await page.setViewport({ width: 1080, height: 1024 });
  });
});
