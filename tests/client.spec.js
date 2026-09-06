import {test,expect} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import ClientPage from "../pages/Client.js";

let loginPage;
let clientPage;

test.describe ('validando creación de clientes', () => {
    test.beforeEach (async ({page})=> {
        loginPage = new LoginPage(page);
        clientPage = new ClientPage(page);
    })

    test.afterEach (async ({page})=> {

    })

    test('creacion de cliente con datos completos', async ({page}) => {
        await loginPage.login ('tae@testing.com','Tae@2026')


        await clientPage.addClient(
    '20-12640791-3',                                // cuit 
    'Cliente Automatizacion TAE',                              // businessName 
    'Av. Los Almos 1234',                // fiscalAddress
    '3300',                              // postalCode
    'Posadas',                           // locality
    '11-4444-5555',                      // phone
    '+56912345678',                      // whatsApp
    `cliente_almos@testing.com`,  // email (único)
    'Gloria Perez',                      // contactPerson
    'Comercio',                          // line
    'Domicilio Cobranza 123',            // collectionAddress
    'Posadas',                           // collectionLocality
    '3300',                              // collectionPostalCode
    'Maria Gomez',                       // collectionContact
    '11-5555-6666',                      // collectionPhone
    'Lunes, Miércoles',                  // collectionDays
    '9 a 12 hs',                         // collectionSchedule
    '30',                                // realTerm
    'Observaciones de prueba',           // generalObservations
    '15',                                // paymentDays
    '100000',                            // creditLimit
    '2850590940090418135201')           // cbu                 

    await expect ( page.getByText('Cliente guardado con éxito!', { exact: true })).toBeVisible()
    })



    test('Creación de cliente con Cuit corto', async ({page}) => {
        await loginPage.login ('tae@testing.com','Tae@2026')


        await clientPage.addClient(
    '20-126',                               
    'Cliente Automatizacion TAE',                  
    'Av. Los Almos 1234',          
    '3300',                          
    'Posadas',                       
    '11-4444-5555',                    
    '+56912345678',                  
    `cliente_almos@test.com`,
    'Gloria Perez',                      
    'Comercio',                         
    'Domicilio Cobranza 123',           
    'Posadas',                          
    '3300',                            
    'Maria Gomez',                     
    '11-5555-6666',                    
    'Lunes, Miércoles',                 
    '9 a 12 hs',                       
    '30',                                
    'Observaciones de prueba',           
    '15',                               
    '100000',                           
    '2850590940090418135201')                         

    await expect ( page.getByText('El CUIT debe tener 11 dígitos y un dígito verificador válido (formato XX-XXXXXXXX-X)', { exact: true })).toBeVisible()
    })


    test('Creación de clientes con Datos vacios', async ({page}) => {
        await loginPage.login ('tae@testing.com','Tae@2026')


        await clientPage.addClient(
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '',
    '', 
    '',  
    '')                   

    await expect(page.locator('p').filter({ hasText: 'Este campo es requerido' }).first()).toBeVisible()
    })


    test('Creación de cliente sin CBU', async ({page}) => {
        await loginPage.login ('tae@testing.com','Tae@2026')


        await clientPage.addClient(
    '20-12640791-3',                                // cuit 
    'Cliente Automatizacion TAE',                              // businessName 
    'Av. Los Almos 1234',                // fiscalAddress
    '3300',                              // postalCode
    'Posadas',                           // locality
    '11-4444-5555',                      // phone
    '+56912345678',                      // whatsApp
    `cliente_almos@test.com`,  // email (único)
    'Gloria Perez',                      // contactPerson
    'Comercio',                          // line
    'Domicilio Cobranza 123',            // collectionAddress
    'Posadas',                           // collectionLocality
    '3300',                              // collectionPostalCode
    'Maria Gomez',                       // collectionContact
    '11-5555-6666',                      // collectionPhone
    'Lunes, Miércoles',                  // collectionDays
    '9 a 12 hs',                         // collectionSchedule
    '30',                                // realTerm
    'Observaciones de prueba',           // generalObservations
    '15',                                // paymentDays
    '100000',
    '')           // cbu     

    await expect(page.locator('p').filter({ hasText: 'Este campo es requerido' }).first()).toBeVisible()
    })


    })