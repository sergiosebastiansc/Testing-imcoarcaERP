import {test,expect} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import ArticlesPage from "../pages/ArticlesPage.js";

let loginPage;
let articlesPage;

test.describe ('validando creación de articulos', () => {
    test.beforeEach (async ({page})=> {
        loginPage = new LoginPage(page);
        articlesPage = new ArticlesPage(page);
    })

    test.afterEach (async ({page})=> {
        const creacionExitosa = await page.getByText('Artículo guardado con éxito!', { exact: true }).isVisible();
        if(creacionExitosa) {
            await articlesPage.deleteArticle('TESTING PLAYWRIGHT 2222') }
    })

    test('creacion de articulo con datos completos', async ({page}) => {
        await loginPage.login ('tae@testing.com','Tae@2026')
        await articlesPage.addArticle(
    '0000.0010.9988',               //skuCode
    'TESTING PLAYWRIGHT 2222',      //articleName
    'ARTICULO E2E PLAYWRIGHT',      //articleDescription
    'Unidad',                       //articleUnit
    '10045',                        //articleNumber
    '15000',                        //salePrice
    '8000',                         //articleCost
    '2026-09-15',                   //lastPriceDate
    '8500',                         //purchasePrice
    '1.5',                          //multiplier
    '50',                           //currentStock
    '10',                           //minStock
    '5',                            //numberOfOrders
    '3',                            //delayDays
    '1',                            //quantityPackage
    '21')                           //IVA
    await expect ( page.getByText('Artículo guardado con éxito!', { exact: true })).toBeVisible()
    })

    test('creacion de articulo sin datos obligatorios', async ({page}) => {
        await loginPage.login ('tae@testing.com','Tae@2026')
        await articlesPage.addArticle(
    '',                      //skuCode
    '',                      //articleName
    '',                      //articleDescription
    '',                      //articleUnit
    '',                      //articleNumber
    '',                      //salePrice
    '',                      //articleCost
    '',                      //lastPriceDate
    '',                      //purchasePrice
    '',                      //multiplier
    '',                      //currentStock
    '',                      //minStock
    '',                      //numberOfOrders
    '',                      //delayDays
    '',                      //quantityPackage
    '')                      //IVA
    await expect ( page.locator('p').filter({ hasText: 'Este campo es requerido' }).first()).toBeVisible()
    })

    test('creacion de articulo con formato SKU menor a 12 digitos ', async ({page}) => {
        await loginPage.login ('tae@testing.com','Tae@2026')
        await articlesPage.addArticle(
    '2222',                         //skuCode
    'TESTING PLAYWRIGHT 2222',      //articleName
    'ARTICULO E2E PLAYWRIGHT',      //articleDescription
    'Unidad',                       //articleUnit
    '10045',                        //articleNumber
    '15000',                        //salePrice
    '8000',                         //articleCost
    '2026-09-15',                   //lastPriceDate
    '8500',                         //purchasePrice
    '1.5',                          //multiplier
    '50',                           //currentStock
    '10',                           //minStock
    '5',                            //numberOfOrders
    '3',                            //delayDays
    '1',                            //quantityPackage
    '21')                           //IVA
    await expect ( page.getByText('El SKU debe tener el formato XXXX.XXXX.XXXX (12 dígitos)', { exact: true })).toBeVisible()
    })

    test('creacion de articulo con SKU ya existente', async ({page}) => {
        await loginPage.login ('tae@testing.com','Tae@2026')
        await articlesPage.addArticle(
    '0000.0000.0002',               //skuCode
    'TESTING PLAYWRIGHT 2222',           //articleName
    'ARTICULO E2E PLAYWRIGHT',      //articleDescription
    'Unidad',                       //articleUnit
    '10045',                        //articleNumber
    '15000',                        //salePrice
    '8000',                         //articleCost
    '2026-09-15',                   //lastPriceDate
    '8500',                         //purchasePrice
    '1.5',                          //multiplier
    '50',                           //currentStock
    '10',                           //minStock
    '5',                            //numberOfOrders
    '3',                            //delayDays
    '1',                            //quantityPackage
    '21')                           //IVA
    await expect ( page.getByText('Error: The sku has already been taken.', { exact: true })).toBeVisible()
    })

    
    

})