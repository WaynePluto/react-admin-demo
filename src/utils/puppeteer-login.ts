import puppeteer from "puppeteer";

export async function getLoginBrower(headless = true) {
  const browser = await puppeteer.launch({
    executablePath: process.env.ChromePath,
    headless,
  });
  const page = await browser.newPage();
  // 打开登录页面
  await page.setViewport({ width: 1080, height: 1024 });
  await page.goto("http://localhost:8080/login");
  // 等待登录表单加载完成
  await page.waitForSelector(".ant-pro-form-login-container");
  // 输入用户名
  const usernameInput = await page.$('input[id="username"]');
  await usernameInput?.type("administrator");
  // 输入密码
  const passwordInput = await page.$('input[id="password"]');
  await passwordInput?.type("123456");
  // 点击登录按钮
  const loginButton = await page.$('.ant-btn-primary[type="button"]');
  await loginButton?.click();
  // 等待登录完成并跳转到首页
  await page.waitForNavigation();
  return {
    browser,
    page,
  };
}
