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
        
    })

    test('creacion de articulo con datos completos', async ({page}) => {
        await loginPage.login ('tae@testing.com','Tae@2026')
        await articlesPage.addArticle(
    '0000.0000.9988',
    'testing2',
    'ARTICULO E2E PLAYWRIGHT',
    'Unidad',
    '10045',
    '15000',
    '8000',
    '2026-09-15',
    '8500',
    '1.5',
    '50',
    '10',
    '5',
    '3',
    '1',
    '21')
    await expect ( page.getByText('Artículo guardado con éxito!', { exact: true })).toBeVisible
    })
    

})