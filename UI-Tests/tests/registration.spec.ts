import { test, expect } from '@playwright/test';
import { BasePage } from '../../src/BasePage';
import { randomizeInteger } from '../../src/Method';
import { locatorsXpath } from '../../src/Locators';

test.describe('Тестирование регистрации', () => {
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

  test('Регистрация с согласием на обработку персональных данных', async () => {
    const accountPress = await page.locator(locatorsXpath.account);
    await accountPress.click();
    expect(await accountPress.isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.basket).isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.favorites).isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.comparisonList).isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.watched).isVisible()).toBe(true);
    await page.locator(locatorsXpath.login).click();
    const registrationButton = await page.locator(locatorsXpath.registration);
    expect(await page.locator(locatorsXpath.email).isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.password).isVisible()).toBe(true);//
    expect(await page.locator(locatorsXpath.forgetPassword).isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.enterInPopUp).isVisible()).toBe(true);
    expect(await registrationButton.isVisible()).toBe(true);
    await registrationButton.click();
    expect(await page.locator(locatorsXpath.email).isVisible()).toBe(true);//
    const emailInput = await page.locator(locatorsXpath.registrationEmailInput);
    const continueButtonPress = await page.locator(locatorsXpath.continueButton);
    expect(await emailInput.isVisible()).toBe(true);//
    expect(await continueButtonPress.isVisible()).toBe(true);
    await continueButtonPress.click();
    await emailInput.fill(randomizeInteger(1000, 99999999));
    await continueButtonPress.click();
    const notCorectEmailValidation = await page.locator(locatorsXpath.validationNotCorrectEmail);
    expect(await notCorectEmailValidation.textContent()).toBe('Неправильный формат электронной почты');
    await page.getByTestId('register-form-email').click();
    await emailInput.type('@mail.ru');
    await page.getByRole('button', { name: 'Продолжить' }).click();
    await page.getByTestId('agreeButton').click();
    const congrat = await page.locator(locatorsXpath.congratulations);
    expect(await congrat.textContent()).toBe('Вы зарегистрированы');
  });

  test('Регистрация с отказом от обработки персональных данных', async () => {
      const accountPress = await page.locator(locatorsXpath.account);
    await accountPress.click();
    expect(await accountPress.isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.basket).isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.favorites).isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.comparisonList).isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.watched).isVisible()).toBe(true);
    await page.locator(locatorsXpath.login).click();
    const registrationButton = await page.locator(locatorsXpath.registration);
    expect(await page.locator(locatorsXpath.email).isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.forgetPassword).isVisible()).toBe(true);
    expect(await page.locator(locatorsXpath.enterInPopUp).isVisible()).toBe(true);
    expect(await registrationButton.isVisible()).toBe(true);
    await registrationButton.click();
    const emailInput = await page.locator(locatorsXpath.registrationEmailInput);
    const continueButtonPress = await page.locator(locatorsXpath.continueButton);
    expect(await continueButtonPress.isVisible()).toBe(true);
    await continueButtonPress.click();
    const visibleValidation = await page.locator(locatorsXpath.validationEmailNotSpecified);
    expect(await visibleValidation.textContent()).toBe('Электронная почта не указана');
    await emailInput.fill(randomizeInteger(1000, 99999999));
    await continueButtonPress.click();
    const notCorectEmailValidation = await page.locator(locatorsXpath.validationNotCorrectEmail);
    expect(await notCorectEmailValidation.textContent()).toBe('Неправильный формат электронной почты');
    await page.getByTestId('register-form-email').click();
    await emailInput.type('@mail.ru');
    await page.getByRole('button', { name: 'Продолжить' }).click();
    await page.getByRole('button', { name: 'Отказываюсь' }).click();
    await page.getByRole('button', { name: 'Отказываюсь' }).click();
    const congrat = await page.locator(locatorsXpath.congratulations);
    expect(await congrat.textContent()).toBe('Вы зарегистрированы');
  });
});