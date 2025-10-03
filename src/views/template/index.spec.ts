import { getLoginBrower } from "@/utils/puppeteer-login";
import { Browser, Page } from "puppeteer";

describe("temlate 页面测试", () => {
  let testBrowser: Browser;
  let testPage: Page;

  beforeAll(async () => {
    const { browser, page } = await getLoginBrower(false);
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
    await testPage.goto("http://localhost:8080/template");
    await testPage.setViewport({ width: 1080, height: 1024 });
    // 验证内容是否加载
    const content = await testPage.locator(".template-page").wait();
    expect(content).not.toBeNull();
  });

  it("测试新增模板功能", async () => {
    await testPage.click(".add-template");
    // 只写必填项
    // 输入模板名称
    const nameInput = await testPage.$('input[id="template-form-name"]');
    await nameInput?.type("模板自动化测试");
    // 点击确认按钮
    const submitButton = await testPage.$('button[id="template-form-submit"');
    await submitButton?.click();
    // 验证添加成功提示语
    const res = await testPage.locator(".ant-message-custom-content.ant-message-success").wait();
    expect(res).not.toBeNull();
  });
});
