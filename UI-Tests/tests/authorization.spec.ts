import { test, expect } from '@playwright/test';
import { BASE_URL } from '../../src/consts';
import { locatorsXpath } from '../../src/Locators';
import { BasePage } from '../../src/BasePage';

test.describe('Тестирование авторизации', () => {
  let page: any;
  let loginPage: BasePage;

  test.beforeEach(async ({ browser }) => {
    page = await browser.newPage();
    loginPage = new BasePage(page);
    await loginPage.goto();
    await loginPage.acceptCookie();
    await loginPage.openAccountMenu();
    await loginPage.openLoginForm();
  });

  test.afterEach(async () => {
    await page.close();
  });

  test('Негатив. Авторизация. Попытка авторизации при пустых полях ввода.', async () => {
    await loginPage.submitLoginForm();
    expect(await page.getByText('Электронная почта не указана').isVisible()).toBe(true);
    expect(await page.getByText('Пароль не указан').isVisible()).toBe(true);
  });

    test('Негатив. Авторизация. Попытка авторизации при пустом поле "Пароль".', async () => {
        await loginPage.fillEmail('sergey351@mail.ru');
        await loginPage.submitLoginForm();
        expect(await page.getByText('Пароль не указан').isVisible()).toBe(true);
    });

    test('Негатив. Авторизация. Попытка авторизации при пустом поле "Электронная почта".', async () => {
        await loginPage.fillPassword('7f469ec8');
        await loginPage.submitLoginForm();
        expect(await loginPage.getEmailValidationMessage()).toBe(true);
    });

    test('Негатив. Авторизация. Попытка авторизации при невалидном пароле.', async () => {//Не падает при запуске с true viewer
        await page.getByTestId('login-form-email').fill('sergey351@mail.ru');
        await page.getByTestId('login-form-password').fill('7f469ec81');
        await page.getByTestId('loginSubmit').click();
        await page.waitForTimeout(3000);
        expect(await page.locator(locatorsXpath.passwordValidationSecond).isVisible()).toBe(true);
    });

    test('Негатив. Авторизация. Попытка авторизации при невалидной почте.', async () => {//Не падает при запуске с true viewer
        await loginPage.fillEmail('sergey351@mail.ry');
        await loginPage.fillPassword('7f469ec8');
        await page.getByTestId('loginSubmit').click();
        await page.waitForTimeout(3000);
        expect(await page.locator(locatorsXpath.emailValidationSecond).isVisible()). toBe(true);
    });

    test('Позитив. Успешная авторизация.', async () => {
        await loginPage.fillEmail('sergey351@mail.ru');
        await loginPage.fillPassword('7f469ec8');
        await loginPage.submitLoginForm();
        await loginPage.openAccountMenu();
        expect(await page.getByText('sergey351@mail.ru').isVisible()).toBe(true);
    });


})


