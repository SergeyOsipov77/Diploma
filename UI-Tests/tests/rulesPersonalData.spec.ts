import { test, expect } from '@playwright/test';
import { randomizeInteger } from '../../src/Method';
import { locatorsXpath } from '../../src/Locators';
import { BasePage } from '../../src/BasePage';
import { RULES_URL } from '../../src/consts';

test.describe('Тестирование перехода в новую в кладку с правилами обработки персональных данных', () => {
  let page: any;
  let loginPage: BasePage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new BasePage(page);
    await loginPage.goto();
    await loginPage.acceptCookie();
  });

  test.afterAll(async () => {
    await page.close();
  });

  test('Переход на страницу с правилами обработки персональных данных', async () => {
    const accountPress = await page.locator(locatorsXpath.account);
    await accountPress.click();
    await page.locator(locatorsXpath.login).click();
    const registrationButton = await page.locator(locatorsXpath.registration);
    await registrationButton.click();
    const emailInput = await page.locator(locatorsXpath.registrationEmailInput);
    const continueButtonPress = await page.locator(locatorsXpath.continueButton);
    await emailInput.fill(randomizeInteger(1000, 99999999));
    await page.getByTestId('register-form-email').click();
    await emailInput.type('@mail.ru');
    await page.getByRole('button', { name: 'Продолжить' }).click();
    const nextPagePromise = page.waitForEvent('popup');
    await page.getByRole('link', { name: 'правами, механизмом их реализации' }).click();
    const nextPage = await nextPagePromise;
    const titleText = await nextPage.waitForSelector(locatorsXpath.rules, { timeout: 5000 });
    expect(await titleText.textContent()).toBe('Права субъекта персональных данных');
    expect(nextPage.url()).toContain(RULES_URL);
  });
});