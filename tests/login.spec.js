import { test, expect } from '@playwright/test';
import LoginPage from "../pages/LoginPage";

let loginPage;
test.describe ('Escenarios de login de cuenta', () => {
  test.beforeEach (async ({page}) => {
    loginPage= new LoginPage (page);

  })

  test ('login con datos válidos', async ({page}) => {
    await loginPage.login ('vendedor@testing.com','Tae@2026');
    await expect ( page.getByRole('button', { name: 'Cerrar Sesión' })).toBeVisible();
  })

  test ('login con datos inválidos', async ({page}) => {
    await loginPage.login ('vendedor@testing.com','ClaveInvalida');
    await expect ( page.getByRole('alert')).toBeVisible();
  })

  test ('login con datos vacios', async ({page}) => {
    await loginPage.login ('','');
    //await expect ( page.getByRole('button', { name: 'Cerrar Sesión' })).toBeVisible();
  })




})


