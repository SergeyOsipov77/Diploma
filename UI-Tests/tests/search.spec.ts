import { test, expect } from "@playwright/test";
import { BasePage } from "../../src/BasePage";
import { locatorsXpath } from "../../src/Locators";

test.describe("Тестирование поиска", () => {
  let page: any;
  let loginPage: BasePage;

  test.beforeAll(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new BasePage(page);
    await loginPage.goto();
    await loginPage.acceptCookie();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test("Негатив. Поиск товаров с невалидными значениями.", async () => {
    await loginPage.searchProduct();
    await loginPage.fillSearchProduct("???????????");
    await loginPage.pressEnterSearchProduct();
    expect(await page.locator(locatorsXpath.notFound).isVisible()).toBe(true);
  });

  test("Позитив. Очистка поиска.", async () => {
    await loginPage.searchProduct();
    await page.locator('.Search_clearBtn__j9c8N').click();
    expect(await page.getByPlaceholder('Поиск товаров').isVisible()).toBe(true);
  });
  
  test("Позитив. Поиск товаров с валидными значениями.", async () => {
    await loginPage.searchProduct();
    await loginPage.fillSearchProduct("IPhone 13");
    await loginPage.pressEnterSearchProduct();
    await page.waitForTimeout(6000);
    expect(await page.locator(locatorsXpath.iphone).isVisible()).toBe(true);
  });
});
