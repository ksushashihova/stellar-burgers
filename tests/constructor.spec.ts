import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {

  await page.routeFromHAR('./tests/hars/api.har', {
  url: '**/api/**',
  update: false,
  notFound: 'abort'
});


  await page.goto('/');
});


test('добавление ингредиента в конструктор', async ({ page }) => {
  await expect(
    page.getByText('Выберите начинку')
  ).toBeVisible();

  await page
    .getByText('Тестовая булка')
    .locator('..')
    .locator('..')
    .getByRole('button', { name: 'Добавить' })
    .click();

  await page
    .getByText('Тестовая начинка')
    .locator('..')
    .locator('..')
    .getByRole('button', { name: 'Добавить' })
    .click();

  await expect(
    page.getByText('Выберите начинку')
  ).not.toBeVisible();

  const constructor = page.locator('main').locator('section').nth(1);

  await expect(
    constructor.getByText('Тестовая начинка')
  ).toBeVisible();
});

test('открытие модального окна ингредиента', async ({ page }) => {
  const modal = page.locator('#modals');

  await expect(modal).not.toContainText('Тестовая начинка');

  await page
    .getByRole('link', {
      name: /Тестовая начинка/
    })
    .click();

  await expect(
    modal.getByText('Тестовая начинка')
  ).toBeVisible();

  await expect(
    modal.getByText('Калории, ккал')
  ).toBeVisible();
});

test('закрытие модального окна по крестику', async ({ page }) => {

  await page
    .getByRole('link', {
      name: /Тестовая начинка/
    })
    .click();


  await expect(
    page.getByText('Калории, ккал')
  ).toBeVisible();


  await page
    .locator('#modals')
    .getByRole('button')
    .click();


  await expect(
    page.getByText('Калории, ккал')
  ).not.toBeVisible();

});

test('закрытие модального окна по клику на overlay', async ({ page }) => {


  await page
    .getByRole('link', {
      name: /Тестовая начинка/
    })
    .click();


  await expect(
    page.getByText('Калории, ккал')
  ).toBeVisible();


  await page
  .locator('#modals > div')
  .last()
  .click({
    position:{
      x:5,
      y:5
    }
  });


  await expect(
    page.getByText('Калории, ккал')
  ).not.toBeVisible();


});

test('создание заказа', async ({ page, context }) => {

  await context.addCookies([
    {
      name: 'accessToken',
      value: 'test-access-token',
      domain: 'localhost',
      path: '/'
    },
    {
      name: 'refreshToken',
      value: 'test-refresh-token',
      domain: 'localhost',
      path: '/'
    }
  ]);

  await page
    .getByText('Тестовая булка')
    .locator('..')
    .locator('..')
    .getByRole('button', { name: 'Добавить' })
    .click();


  await page
    .getByText('Тестовая начинка')
    .locator('..')
    .locator('..')
    .getByRole('button', { name: 'Добавить' })
    .click();


  await page
    .getByRole('button', {
      name: 'Оформить заказ'
    })
    .click();


  await expect(
  page.getByText('12345')
).toBeVisible();


await expect(
  page.getByText('Выберите булки').first()
).toBeVisible();

await expect(
  page.getByText('Выберите начинку')
).toBeVisible();

await expect(
  page.getByText('Выберите булки').last()
).toBeVisible();




await page
  .locator('#modals')
  .getByRole('button')
  .click();


await expect(
  page.getByText('12345')
).not.toBeVisible();

});