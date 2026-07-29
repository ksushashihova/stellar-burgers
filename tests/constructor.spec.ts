import { test, expect } from '@playwright/test';


const orderMock = {
  success: true,
  name: 'Космический бургер',
  order: {
    number: 12345
  }
};

const userMock = {
  success: true,
  user: {
    email: 'test@test.ru',
    name: 'Test User'
  }
};


test.beforeEach(async ({ page }) => {

  await page.routeFromHAR(
    './tests/hars/ingredients.har',
    {
      url: '**/api/ingredients',
      update: false
    }
  );


  await page.goto('/');
});


test('добавление ингредиента в конструктор', async ({ page }) => {
  await page
  .getByText('Тестовая булка')
  .locator('..')
  .locator('..')
  .getByRole('button', { name: 'Добавить' })
  .click();

  const ingredientCard = page
    .getByText('Тестовая начинка')
    .locator('..')
    .locator('..');


  await ingredientCard
    .getByRole('button', { name: 'Добавить' })
    .click();


  await expect(
    page.getByText('Тестовая начинка').last()
  ).toBeVisible();

});


test('открытие модального окна ингредиента', async ({ page }) => {

  await page
    .getByRole('link', {
      name: /Тестовая начинка/
    })
    .click();


  await expect(
    page.getByText('Калории, ккал')
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


  await page.route('**/orders', async route => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify(orderMock)
    });
  });

  await page.route('**/auth/user', async route => {
  await route.fulfill({
    status: 200,
    contentType: 'application/json',
    body: JSON.stringify(userMock)
  });
});
  await page.goto('/');


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