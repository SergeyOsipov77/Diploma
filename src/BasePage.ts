import { Page } from 'playwright';
import { BASE_URL } from './consts';
import { locatorsXpath } from './Locators';

export class BasePage {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  };

  async goto() {
    await this.page.goto(BASE_URL);
  };

  async acceptCookie() {
    const cookieAcceptPress = await this.page.locator(locatorsXpath.cookieAccept);
    await cookieAcceptPress.click();
  };

  async openAccountMenu() {
    await this.page.getByRole('button', { name: 'Аккаунт' }).click();
  };

  async openLoginForm() {
    await this.page.getByTestId('loginButton').click();
  };

  async fillEmail(email: string) {
    await this.page.getByTestId('login-form-email').fill(email);
  };

  async fillPassword(password: string) {
    await this.page.getByTestId('login-form-password').fill(password);
  };

  async submitLoginForm() {
    await this.page.getByTestId('loginSubmit').click();
  };

  async getEmailValidationMessage() {
    return await this.page.locator(locatorsXpath.emailValidation).isVisible();
  };

  async getPasswordValidationMessage() {
    return await this.page.locator(locatorsXpath.passwordValidation).isVisible();
  };

  async searchProduct() {
    await this.page.getByPlaceholder('Поиск товаров').click();
  };

  async fillSearchProduct(search: string) {
    await this.page.getByPlaceholder('Поиск товаров').fill(search);
  };

  async pressEnterSearchProduct() {
    await this.page.getByPlaceholder('Поиск товаров').press('Enter');
  };

  async deletesearch() {
    await this.page.locator('.Search_clearBtn__j9c8N').click();
  };
};