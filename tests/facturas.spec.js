import {test,expect} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import BillPage from "../pages/BillPage"

let loginPage;
let billPage;

test.describe ('validando creación de Facturas de venta', () => {
    test.beforeEach (async ({page})=> {
        loginPage = new LoginPage(page);
        billPage = new BillPage(page);
    })


    test('Crear factura de venta con campos obligatorios', async ({ page }) => {
        await loginPage.login ('tae@testing.com','Tae@2026')
        await billPage.AgregarFactura(

           "00002",                 //codCliente
           "01",                    //codVendedor
           "02/09/2026",            //fechaFactura
           "02/10/2026",            //fechaEntrega
           "01",                    //codComprador
           "01",                    //codTransporte
           "01",                    //codMoneda
           "",                       //numOrdenCompra
           "Calle testing 123",     //nuevaDir
           "0000.0000.0003",        //codItem
           "testing E2E"            //observaciones
        );
        await expect( page.getByText('Factura creada con éxito.', { exact: true })).toBeVisible()

    })

    test('Crear factura de venta con campos vacios', async ({ page }) => {
        await loginPage.login ('tae@testing.com','Tae@2026')
        await billPage.facturaVacia( );
        await expect( page.getByText('Cliente, Vendedor y Moneda son obligatorios.', { exact: true })).toBeVisible()

    })

    test('Crear factura de venta sin direccion de entrega', async ({ page }) => {
        await loginPage.login ('tae@testing.com','Tae@2026')
        await billPage.AgregarFactura(

           "00002",                 //codCliente
           "01",                    //codVendedor
           "02/09/2026",            //fechaFactura
           "02/10/2026",            //fechaEntrega
           "01",                    //codComprador
           "01",                    //codTransporte
           "01",                    //codMoneda
           "11223344",              //numOrdenCompra
           "",                      //nuevaDir
           "0000.0000.0003",        //codItem
           "testing E2E"            //observaciones
        )

        await expect( page.getByText('Debe especificar una Dirección de Entrega.', { exact: true })).toBeVisible()

    })

    test('Crear factura de venta sin agregar productos', async ({ page }) => {
        await loginPage.login ('tae@testing.com','Tae@2026')
        await billPage.facturaIncompleta(

           "02",                 //codCliente
           "01",                    //codVendedor
           '02092026',            //fechaFactura
           '02102026',            //fechaEntrega
           "01",                    //codComprador
           "01",                    //codTransporte
           "01",                    //codMoneda
           "11223344",              //numOrdenCompra
           "Calle testing 123",     //nuevaDir
           "",                      //codItem
           "testing E2E"            //observaciones
        )

        await expect( page.getByText('Añada al menos un producto.', { exact: true })).toBeVisible()

    })



})