import { test, expect } from '@playwright/test';
import LoginPage from "../../pages/LoginPage.js"; 

let loginPage;
test.describe ('Escenarios de login de cuenta', () => {
  test.beforeEach (async ({page}) => {
    loginPage= new LoginPage (page);

  })

  test ('login vendedor con datos válidos', async ({page}) => {
    await loginPage.login ('vendedor@testing.com','Tae@2026');
    await expect ( page.getByRole('button', { name: 'Cerrar Sesión' })).toBeVisible();
    await expect (page.getByRole('link', { name: 'Cobranzas' })).toBeHidden()
    await expect (page.getByRole('button', { name: 'Finanzas' })).toBeHidden()
    await expect (page.getByRole('button', { name: 'Configuración' })).toBeHidden()
    await expect (page.getByText('Gestión de Proveedores', { exact: true })).toBeHidden()
  })

  test ('login admin testing con datos válidos', async ({page}) => {
    await loginPage.login ('tae@testing.com','Tae@2026');
    await expect ( page.getByRole('button', { name: 'Cerrar Sesión' })).toBeVisible();
    await page.locator('div.pt-4.mt-auto.border-t.border-gray-700').click()
    await expect (page.getByRole('button', { name: 'Gestión de Clientes' })).toBeVisible()
    await expect (page.getByRole('button', { name: 'Finanzas' })).toBeVisible()
    await expect (page.getByRole('button', { name: 'Configuración' })).toBeVisible()
    await expect (page.getByText('Gestión de Proveedores', { exact: true })).toBeVisible()
  })

  test ('login con datos inválidos', async ({page}) => {
    await loginPage.loginInvalido ('vendedor@testing.com','ClaveInvalida');
    await expect ( page.getByRole('alert')).toBeVisible();
  })

  test ('login con datos vacios', async ({page}) => {
    await loginPage.loginInvalido ('','');
    await expect(page.getByLabel('Email')).toHaveAttribute('required', '')
    await expect(page.getByLabel('Contraseña')).toHaveAttribute('required', '')
  })




})


