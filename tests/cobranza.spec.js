import {test,expect} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import CobranzaPage from "../pages/CobranzaPage"

let loginPage;
let cobranzaPage;

test.describe ('validando creación de cobranzas', () => {
    test.beforeEach (async ({page})=> {
        loginPage = new LoginPage(page);
        cobranzaPage = new CobranzaPage(page);
    })

test.afterEach (async ({page})=> {

    })

test('Creación de cobranza con datos completos', async ({page}) => {
    await loginPage.login ('tae@testing.com','Tae@2026')
    await page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' })
    await page.goto('https://imcoarca.leonardojose.dev/cobranzas')
    
    await cobranzaPage.AddCobranza(
        '00002',            // codCliente
        '10/09/2026')       // fechaCobro
    await expect(page.getByText('Cobranza guardada con éxito!', { exact: true })).toBeVisible()
})

test('Creación de cobranza con datos vacios', async ({page}) => {
    await loginPage.login ('tae@testing.com','Tae@2026')
    await page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' })
    await page.goto('https://imcoarca.leonardojose.dev/cobranzas')
    await cobranzaPage.cobranzaSinCliente()
    await expect(page.getByText('Debe seleccionar un cliente',)).toBeVisible()
})

test('Creación de cobranza sin seleccionar cliente', async ({page}) => {
    await loginPage.login ('tae@testing.com','Tae@2026')
    await page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' })
    await page.goto('https://imcoarca.leonardojose.dev/cobranzas')
    
    await cobranzaPage.AddCobranza(
        '',
        '')
    await expect(page.getByText('Debe seleccionar un cliente',)).toBeVisible()
})


test('Creación de cobranza sin seleccionar medio de pago', async ({page}) => {
    await loginPage.login ('tae@testing.com','Tae@2026')
    await page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' })
    await page.goto('https://imcoarca.leonardojose.dev/cobranzas')
    
    await cobranzaPage.cobranzaSinMedioPago(
        '00002',           
        '10/09/2026')
    await expect(page.getByText('Debe seleccionar un medio de pago', { exact: true })).toBeVisible()
})
})
