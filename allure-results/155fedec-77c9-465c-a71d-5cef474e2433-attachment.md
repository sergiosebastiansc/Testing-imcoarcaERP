# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: E2E\login.spec.js >> Escenarios de login de cuenta >> login admin testing con datos válidos
- Location: tests\E2E\login.spec.js:20:7

# Error details

```
Error: expect(locator).toBeVisible() failed

Locator: getByRole('link', { name: 'Gestión de Clientes' })
Expected: visible
Timeout: 5000ms
Error: element(s) not found

Call log:
  - Expect "toBeVisible" with timeout 5000ms
  - waiting for getByRole('link', { name: 'Gestión de Clientes' })

```

```yaml
- complementary:
  - img "Logo"
  - navigation:
    - searchbox "Buscar en el menú"
    - list:
      - listitem:
        - link "Dashboard":
          - /url: /dashboard
          - img
          - text: Dashboard
      - listitem:
        - button "Gestión de Clientes":
          - img
          - text: Gestión de Clientes
          - img
      - listitem:
        - button "Gestión de Proveedores":
          - img
          - text: Gestión de Proveedores
          - img
      - listitem:
        - button "Inventario":
          - img
          - text: Inventario
          - img
      - listitem:
        - button "Finanzas":
          - img
          - text: Finanzas
          - img
      - listitem:
        - button "Configuración":
          - img
          - text: Configuración
          - img
      - listitem:
        - link "Reportes":
          - /url: /reportes
          - img
          - text: Reportes
  - button "Contraer"
- banner:
  - button "Cerrar Sesión"
- main:
  - heading "Dashboard" [level=1]
  - paragraph: Bienvenido al sistema ERP.
  - heading "Cotización Dólar (Venta)" [level=2]
  - paragraph: $1.530,00
  - paragraph: "Fuente: DolarApi (oficial)"
  - paragraph: "Actualizado: 08/09/2026, 17:06"
  - button "Total Saldo Clientes $ -354.777,20 Clic para ver detalle por cliente":
    - heading "Total Saldo Clientes" [level=2]
    - paragraph: $ -354.777,20
    - paragraph: Clic para ver detalle por cliente
  - button "Total Saldo Proveedores $ 0,00 Clic para ver detalle por proveedor":
    - heading "Total Saldo Proveedores" [level=2]
    - paragraph: $ 0,00
    - paragraph: Clic para ver detalle por proveedor
- region "Notifications Alt+T"
```

# Test source

```ts
  1  | import { test, expect } from '@playwright/test';
  2  | import LoginPage from "../../pages/LoginPage.js"; 
  3  | 
  4  | let loginPage;
  5  | test.describe ('Escenarios de login de cuenta', () => {
  6  |   test.beforeEach (async ({page}) => {
  7  |     loginPage= new LoginPage (page);
  8  | 
  9  |   })
  10 | 
  11 |   test ('login vendedor con datos válidos', async ({page}) => {
  12 |     await loginPage.login ('vendedor@testing.com','Tae@2026');
  13 |     await expect ( page.getByRole('button', { name: 'Cerrar Sesión' })).toBeVisible();
  14 |     await expect (page.getByRole('link', { name: 'Cobranzas' })).toBeHidden()
  15 |     await expect (page.getByRole('button', { name: 'Finanzas' })).toBeHidden()
  16 |     await expect (page.getByRole('button', { name: 'Configuración' })).toBeHidden()
  17 |     await expect (page.getByText('Gestión de Proveedores', { exact: true })).toBeHidden()
  18 |   })
  19 | 
  20 |   test ('login admin testing con datos válidos', async ({page}) => {
  21 |     await loginPage.login ('tae@testing.com','Tae@2026');
  22 |     await expect ( page.getByRole('button', { name: 'Cerrar Sesión' })).toBeVisible();
  23 |     await page.locator('div.pt-4.mt-auto.border-t.border-gray-700').click()
> 24 |     await expect (page.getByRole('link', { name: 'Gestión de Clientes' })).toBeVisible()
     |                                                                            ^ Error: expect(locator).toBeVisible() failed
  25 |     await expect (page.getByRole('button', { name: 'Finanzas' })).toBeVisible()
  26 |     await expect (page.getByRole('button', { name: 'Configuración' })).toBeVisible()
  27 |     await expect (page.getByText('Gestión de Proveedores', { exact: true })).toBeVisible()
  28 |   })
  29 | 
  30 |   test ('login con datos inválidos', async ({page}) => {
  31 |     await loginPage.loginInvalido ('vendedor@testing.com','ClaveInvalida');
  32 |     await expect ( page.getByRole('alert')).toBeVisible();
  33 |   })
  34 | 
  35 |   test ('login con datos vacios', async ({page}) => {
  36 |     await loginPage.loginInvalido ('','');
  37 |     await expect(page.getByLabel('Email')).toHaveAttribute('required', '')
  38 |     await expect(page.getByLabel('Contraseña')).toHaveAttribute('required', '')
  39 |   })
  40 | 
  41 | 
  42 | 
  43 | 
  44 | })
  45 | 
  46 | 
  47 | 
```