import {test,expect} from "@playwright/test"
import LoginPage from "../pages/LoginPage"
import ClientPage from "../pages/Client.js";

// Genera un CUIT válido con dígito verificador calculado
function generarCuit() {
    const prefijo = 20; // tipo de CUIT (20 = persona física, sirve para pruebas)
    const dni = Math.floor(10000000 + Math.random() * 89999999); // 8 dígitos
    const base = `${prefijo}${dni}`; // 10 dígitos

    const pesos = [5, 4, 3, 2, 7, 6, 5, 4, 3, 2];
    let suma = 0;
    for (let i = 0; i < 10; i++) {
        suma += parseInt(base[i]) * pesos[i];
    }
    let verificador = 11 - (suma % 11);
    if (verificador === 11) verificador = 0;
    if (verificador === 10) verificador = 9;

    return `${prefijo}-${dni}-${verificador}`;
}

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

        const cuit = generarCuit();
        const timestamp = Date.now();
        const nombre = `Cliente E2E Playwright ${timestamp}`;

        await clientPage.addClient(
    cuit,                                // cuit (generado dinámicamente)
    nombre,                              // businessName (único con timestamp)
    'Av. Los Almos 1234',                // fiscalAddress
    '3300',                              // postalCode
    'Posadas',                           // locality
    '11-4444-5555',                      // phone
    '+56912345678',                      // whatsApp
    `cliente_${timestamp}@testing.com`,  // email (único)
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

    await expect(page).toHaveURL(/.*clientes$/, { timeout: 15000 })
    })

})