import { getLoginBrower } from "@/utils/puppeteer-login";
import { Browser, Page } from "puppeteer";

describe("temlate 页面测试", () => {
  let testBrowser: Browser;
  let testPage: Page;

  beforeAll(async () => {
    const { browser, page } = await getLoginBrower();
    testBrowser = browser;
    testPage = page;
  });

  afterAll(async () => {
    await testPage.close();
    const pages = await testBrowser.pages();
    if (pages.length === 1) {
      await testBrowser.close();
    }
  });

  it("测试页面加载功能", async () => {
    await testPage.goto("http://localhost:8080/");
    await testPage.setViewport({ width: 1080, height: 1024 });
    // 验证内容是否加载
    const content = await testPage.locator(".template-page").wait();
    expect(content).toBeDefined();
  });
});
