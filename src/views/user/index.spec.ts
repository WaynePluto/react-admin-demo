import { getLoginBrower } from "@/utils/puppeteer-login";
import { Browser, Page } from "puppeteer";

describe("用户管理页面测试", () => {
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
    await testPage.goto("http://localhost:8080/user");
    // 验证内容是否加载
    const content = await testPage.locator(".user-page").wait();
    expect(content).not.toBeNull();
  });

  it("测试新增用户功能", async () => {
    await testPage.click(".ant-pro-table-list-toolbar-container button:first-child");
    // 只写必填项
    // 输入用户名
    const randomUsername = "testuser" + Math.floor(Math.random() * 10000);
    const addUsernameInput = await testPage.$('input[id="user-form-username"]');
    await addUsernameInput?.type(randomUsername);

    // 输入密码
    const addUserPasswordInput = await testPage.$('input[id="user-form-password"]');
    await addUserPasswordInput?.type("123456");

    // 点击确认按钮
    const addSubmitButton = await testPage.$('button[id="user-form-submit"');
    await addSubmitButton?.click();
    // 验证添加成功提示语
    const addMsg = await testPage.locator(".ant-message-custom-content.ant-message-success").wait();
    expect(addMsg).not.toBeNull();

    // 等待提示消失
    await new Promise(resolve => setTimeout(resolve, 500));
    // locator 选择器定位到 tbody元素下的第二个tr子元素，再下面的第二个td元素，在下面的span的文本
    const addedSpanText = await testPage
      .locator("tbody tr:nth-child(2) td:nth-child(1) span")
      .map(el => el.textContent)
      .wait();
    expect(addedSpanText).toContain(randomUsername);
  });

  it("测试编辑用户功能", async () => {
    // locator 选择器定位到 tbody元素下的第二个tr子元素，再下面的最后一个td元素, 下面的div, 下面的第一个button
    const editButton = await testPage.$("tbody tr:nth-child(2) td:last-child div button:first-child");
    await editButton?.click();
    const editNickname = "测试用户" + Math.floor(Math.random() * 10000);
    const editNicknameInput = await testPage.$('input[id="nickname"]');
    console.log("🚀 ~ editNicknameInput:", editNicknameInput === null);
    await editNicknameInput?.type(editNickname);

    // 点击确认按钮
    const editSubmitButton = await testPage.$('button[id="user-form-submit"]');
    await editSubmitButton?.click();
    // 验证编辑成功提示语
    const editMsg = await testPage.locator(".ant-message-custom-content.ant-message-success").wait();
    expect(editMsg).not.toBeNull();
    await new Promise(resolve => setTimeout(resolve, 500));
    // locator 选择器定位到 tbody元素下的第二个tr子元素，再下面的第2个td元素，在下面的span的文本
    const editSpanText = await testPage
      .locator("tbody tr:nth-child(2) td:nth-child(2) span")
      .map(el => el.textContent)
      .wait();
    expect(editSpanText).toContain(editNickname);

    await new Promise(resolve => setTimeout(resolve, 500));
  });

  it("测试删除用户功能", async () => {
    // locator 选择器定位到 tbody元素下的第二个tr子元素，再下面的最后一个td元素, 下面的div, 下面的第二个button
    const deleteButton = await testPage.$("tbody tr:nth-child(2) td:last-child div button:nth-child(2)");
    await deleteButton?.click();
    await new Promise(resolve => setTimeout(resolve, 500));
    // 点击确认按钮
    const deleteSubmitButton = await testPage.$(".ant-popconfirm-buttons button:last-child");
    await deleteSubmitButton?.click();
    // 验证删除成功提示语
    const deleteMsg = await testPage.locator(".ant-message-custom-content.ant-message-success").wait();
    expect(deleteMsg).not.toBeNull();
  });
});
