# Proyecto QA — Automatización ERP Imcoarca

> Suite de pruebas E2E con **Playwright + Page Object Model** y pruebas de API con **Bruno** para el ERP Imcoarca-Núcleo ERP. Cubre autenticación, artículos, clientes, facturas de venta y cobranzas.

[![Playwright](https://img.shields.io/badge/Playwright-1.62.1-brightgreen)](https://playwright.dev)
[![Allure](https://img.shields.io/badge/Allure-3.12.0-orange)](https://docs.qameta.io/allure)
[![Node](https://img.shields.io/badge/Node-CommonJS-blue)]()

## Índice
- [Descripción](#descripción)
- [Stack Tecnológico](#stack-tecnológico)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Page Object Model](#page-object-model)
- [Cobertura E2E](#cobertura-e2e)
- [Cobertura API](#cobertura-api)
- [Especificación BDD](#especificación-bdd)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Reportes](#reportes)
- [CI/CD](#cicd)


## Descripción
Proyecto de aseguramiento de calidad para validar flujos críticos de un ERP de gestión comercial. El sistema bajo prueba (SUT) expone el frontend en `https://imcoarca.leonardojose.dev` y la API REST en `https://back-imcoarca.leonardojose.dev/api`.

El objetivo es automatizar la creación y validación de entidades de negocio con datos reales, controles de validación negativos y limpieza post-test, garantizando regresión continua sobre los módulos más críticos del sistema.

Módulos cubiertos:
- **Autenticación** — login por rol (admin / vendedor) y validación de permisos
- **Artículos** — alta con SKU formato `XXXX.XXXX.XXXX`, stock, precios, IVA y líneas/categorías
- **Clientes** — alta con CUIT argentino validado, datos fiscales y de cobranza
- **Cobranzas** — registro de cobros contra saldo pendiente con medios de pago
- **Facturas de Venta** — facturación con cliente, vendedor, moneda y productos

## Stack Tecnológico
| Capa | Herramienta | Versión |
|---|---|---|
| Runner E2E | @playwright/test | ^1.62.1 |
| Reportes | allure-playwright / allure-commandline | ^3.12.0 / ^2.43.0 |
| API | Bruno (colección `articulosERP`) | 1.0.0 |
| Lenguaje | JavaScript (CommonJS) | — |
| BDD docs | Gherkin `.feature` | — |
| Runtime | Node.js | — |

## Estructura del Proyecto
```
proyecto qa/
├── pages/                  # Page Objects (POM)
│   ├── LoginPage.js        # /login
│   ├── ArticlesPage.js     # /articulos
│   ├── Client.js           # /clientes
│   ├── BillPage.js         # /facturas-de-venta
│   └── CobranzaPage.js     # /cobranzas
├── tests/
│   ├── E2E/                # Specs Playwright
│   │   ├── login.spec.js
│   │   ├── articulos.spec.js
│   │   ├── client.spec.js
│   │   ├── cobranza.spec.js
│   │   └── facturas.spec.js
│   └── API-test/           # Colección Bruno
│       ├── opencollection.yml
│       ├── environments/test-erp.yml
│       ├── Auth.yml
│       ├── Auth con datos vacios.yml
│       ├── Auth con datos invalidos.yml
│       ├── CrearArticulo.yml
│       ├── Crear Articulo repetido.yml
│       ├── ObtenerTodos-articulos.yml
│       ├── ObtenerUn-articulo.yml
│       ├── actualizar Un articulo.yml
│       └── BorrarArticulo.yml
├── features/               # Especificación Gherkin (documentación)
│   ├── login.feature
│   └── register.feature
├── .github/workflows/      # Pipelines CI/CD
│   ├── E2E.yml             # Workflow tests E2E (Playwright)
│   └── APITest.yml         # Workflow tests API (Bruno)
├── playwright.config.js    # Configuración Playwright
├── package.json
├── package-lock.json
├── .gitignore
├── allure-results/         # Resultados crudos Allure
├── allure/                 # Reporte Allure generado
├── playwright-report/      # Reporte HTML Playwright
└── test-results/           # Evidencias (screenshots, videos, traces)
```

## Page Object Model
El proyecto implementa el patrón **Page Object Model** para aislar selectores y acciones de la lógica de los tests.

| Page | URL | Responsabilidad |
|---|---|---|
| `LoginPage` | `https://imcoarca.leonardojose.dev/login` | Autenticación |
| `ArticlesPage` | `https://imcoarca.leonardojose.dev/articulos` | Gestión de artículos |
| `ClientPage` | `https://imcoarca.leonardojose.dev/clientes` | Gestión de clientes |
| `BillPage` | `https://imcoarca.leonardojose.dev/facturas-de-venta` | Facturación |
| `CobranzaPage` | `https://imcoarca.leonardojose.dev/cobranzas` | Cobranzas |

Cada Page encapsula locators (`getByRole`, `getByLabel`, `locator`) y flujos reutilizables, facilitando mantenimiento ante cambios de UI.

## Cobertura E2E

### Login — `tests/E2E/login.spec.js:5`
| Caso | Datos | Aserción |
|---|---|---|
| Válido | `{{ secrets.ERP_USERNAME }} / {{ secrets.ERP_PASSWORD }}` | `Cerrar Sesión` visible, `Cobranzas/Finanzas/Configuración` ocultos — `tests/E2E/login.spec.js:11` |
| Inválido | `ClaveInvalida` | `alert` visible — `tests/E2E/login.spec.js:20` |
| Vacío | `"" / ""` | Atributos `required` en Email y Contraseña — `tests/E2E/login.spec.js:25` |

### Artículos — `tests/E2E/articulos.spec.js:8`
| Caso | Datos | Aserción |
|---|---|---|
| Completo | `0700.2222.9988 / TESTING PLAYWRIGHT 2222` | `Artículo guardado con éxito!` + `afterEach` hace `deleteArticle()` — `tests/E2E/articulos.spec.js:20` |
| Sin obligatorios | `""` en todos los campos | `Este campo es requerido` — `tests/E2E/articulos.spec.js:42` |
| SKU corto | `2222` | `El SKU debe tener el formato XXXX.XXXX.XXXX (12 dígitos)` — `tests/E2E/articulos.spec.js:64` |
| SKU duplicado | `0000.0000.0002` | `The sku has already been taken.` — `tests/E2E/articulos.spec.js:86` |

### Clientes — `tests/E2E/client.spec.js:8`
| Caso | Datos | Aserción |
|---|---|---|
| Completo | CUIT `20-12640791-3`, `Los Almos S.A.` | `Cliente guardado con éxito!` — `tests/E2E/client.spec.js:18` |
| CUIT corto | `20-126` | `El CUIT debe tener 11 dígitos y un dígito verificador válido (formato XX-XXXXXXXX-X)` — `tests/E2E/client.spec.js:51` |
| Vacíos | `""` | `Este campo es requerido` — `tests/E2E/client.spec.js:83` |
| Sin CBU | CBU `""` | `Este campo es requerido` — `tests/E2E/client.spec.js:115` |

### Cobranzas — `tests/E2E/cobranza.spec.js:8`
| Caso | Datos | Aserción |
|---|---|---|
| Completa | Cliente `00118`, fecha `2026-09-10`, medio `Efectivo` cuenta `DISPONIBLE` | `Cobranza guardada con éxito!` — `tests/E2E/cobranza.spec.js:18` |
| Sin cliente | — | `Debe seleccionar un cliente` — `tests/E2E/cobranza.spec.js:29` |
| Sin medio de pago | — | `Falta cobrar` — `tests/E2E/cobranza.spec.js:35` |
| Monto > saldo | `150000,00` | `no puede superar el saldo` — `tests/E2E/cobranza.spec.js:44` |

### Facturas de Venta — `tests/E2E/facturas.spec.js:8`
| Caso | Datos | Aserción |
|---|---|---|
| Completa | Cliente `00118`, vendedor `01`, moneda `01`, ítem `7771.0242.1234 / Teclado Tester` | `Factura creada con éxito.` — `tests/E2E/facturas.spec.js:15` |
| Vacía | — | `Cliente, Vendedor y Moneda son obligatorios.` — `tests/E2E/facturas.spec.js:38` |
| Sin dirección | `nuevaDir ""` | `Debe especificar una Dirección de Entrega.` — `tests/E2E/facturas.spec.js:45` |
| Sin productos | Sin `Agregar Ítem` | `Añada al menos un producto.` — `tests/E2E/facturas.spec.js:68` |

## Cobertura API
Colección Bruno `articulosERP` — `BASE_URL=https://back-imcoarca.leonardojose.dev/api` (`tests/API-test/environments/test-erp.yml:4`). Ejecución secuencial por campo `seq`.

| seq | Archivo | Método | Endpoint | Código esperado | Validación |
|---|---|---|---|---|---|
| 1 | `Auth con datos invalidos.yml` | POST | `/login` | 401 | `Las credenciales proporcionadas son incorrectas.` |
| 2 | `Auth con datos vacios.yml` | POST | `/login` | 422 | `The email/password field is required.` |
| 3 | `Auth.yml` | POST | `/login` | 200 | `access_token` string + `bru.setEnvVar("tokenID")` — `tests/API-test/Auth.yml:30` |
| 4 | `ObtenerTodos-articulos.yml` | GET | `/products` | 200 | `data[0].id isNumber` |
| 5 | `CrearArticulo.yml` | POST | `/products` | 201 | `data.id isNumber` + guarda `productID` — `tests/API-test/CrearArticulo.yml:63` |
| 6 | `actualizar Un articulo.yml` | GET | `/products/{{productID}}` | 200 | `data.name isString`, `stock_quantity isNumber` |
| 7 | `Crear Articulo repetido.yml` | POST | `/products` | 422 | `The sku has already been taken.` |
| 8 | `ObtenerUn-articulo.yml` | GET | `/products/{{productID}}` | 200 | `sale_price/cost_price isNumber` |
| 9 | `BorrarArticulo.yml` | DELETE | `/products/{{productID}}` | 204 | `isEmpty` |

Autenticación Bearer con `{{tokenID}}`, assertions y scripts `after-response`/`tests` en cada request.

## Especificación BDD
Carpeta `features/` contiene especificación Gherkin como **documentación viva** y base para trazabilidad con negocio:

- **`features/login.feature:1`** — Feature `Login de Usuario` con `Background` + 3 escenarios: válidos (`maria-m@gmail.com / mercedez1234` → `/` + `nav-logOut`), inválidos (`Credenciales inválidas` + `alert-errorLogin`), vacíos (`Debe ingresar los campos obligatorios` + `alert-empyLogin`).
- **`features/register.feature:1`** — Feature `Registro de Usuario` (coworking) con 4 escenarios: exitoso (`Registro exitoso` → `/`), contraseñas no coinciden (`Contraseñas no coinciden`), campos vacíos (`Debe completar los campos faltantes`).


## Instalación
```bash
# Clonar
git clone <repo-url>
cd "Testing-imcoarcaERP"

# Dependencias
npm install

# Navegadores Playwright
npm init playwright@latest

```

Requisitos: Node.js 18+, npm.

## Ejecución

### Tests E2E (Playwright)
```bash
# Toda la suite
npx playwright test

# Por módulo
npx playwright test tests/E2E/login.spec.js
npx playwright test tests/E2E/articulos.spec.js --headed
npx playwright test tests/E2E/client.spec.js
npx playwright test tests/E2E/cobranza.spec.js
npx playwright test tests/E2E/facturas.spec.js

# Modo UI / Debug
npx playwright test --ui
npx playwright test --debug
npx playwright test --headed --workers=1

```

### Tests API (Bruno)
```bash

npx @usebruno/cli run tests/API-test --env test-erp
npx @usebruno/cli run tests/API-test --env test-erp --reporter-html tests/API-test/reports/results.html
```

## Reportes
| Reporte | Comando | Salida |
|---|---|---|
| Allure | `npx allure generate allure-results --clean -o allure-report && npx allure open allure-report` | `allure-report/` |
| Allure serve | `npx allure serve allure-results` | servidor local |
| Bruno HTML | run Bruno | `tests/API-test/reports/results.html` |
| Evidencias | automático en fallo | `test-results/`, `allure-results/*.png`, `*.webm` |

En fallo se capturan **screenshot** (`only-on-failure`), **video** (`retain-on-failure`) y **trace** (`on-first-retry`) según `playwright.config.js:36-41`. Abrir trace con `npx playwright show-trace test-results/.../trace.zip`.

## CI/CD

Pipelines automatizados en `.github/workflows/` que se ejecutan en `push` y `pull_request` hacia la rama `main`.

| Workflow | Archivo | Job | Triggers | Descripción |
|---|---|---|---|---|
| tests E2E | `.github/workflows/E2E.yml:1` | `test_e2e` (`ubuntu-latest`) | `push: [main]`, `pull_request: [main]` | Validación E2E con Playwright |
| API Test | `.github/workflows/APITest.yml:1` | `test_API` (`ubuntu-latest`) | `push: [main]`, `pull_request: [main]` | Validación API con Bruno CLI |

### Workflow E2E — `.github/workflows/E2E.yml:1`

```yaml
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }
jobs:
  test_e2e:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v7
      - uses: actions/setup-node@v7
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npx playwright install --with-deps chromium
      - run: npx playwright test
      - uses: actions/upload-artifact@v7
        with: { name: playwright-report, path: playwright-report/, retention-days: 7 }
```

Pasos: checkout del código → setup Node 20 con cache npm → `npm ci` → instalación de browsers Playwright (chromium) → ejecución `npx playwright test` → publicación del reporte `playwright-report/` como artefacto (7 días, `if: always()`).

### Workflow API — `.github/workflows/APITest.yml:1`

```yaml
on:
  push: { branches: [main] }
  pull_request: { branches: [main] }
jobs:
  test_API:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with: { node-version: 20, cache: npm }
      - run: npm ci
      - run: npm install -g @usebruno/cli
      - run: bru run --env "test-erp" --env-var "username=${{ secrets.ERP_USERNAME }}"
               --env-var "password=${{ secrets.ERP_PASSWORD }}" --reporter-html results.html
        working-directory: ./tests/API-test
      - uses: actions/upload-artifact@v4
        with: { name: api-test-results, path: ./tests/API-test/reports/results.html, retention-days: 7 }
```

Pasos: checkout → setup Node 20 → `npm ci` → instalación global de `@usebruno/cli` → ejecución `bru run` con environment `test-erp` e inyección de credenciales vía `secrets.ERP_USERNAME` / `secrets.ERP_PASSWORD` (`--env-var`) y reporte HTML `results.html` en `working-directory: ./tests/API-test` → publicación de `tests/API-test/reports/results.html` como artefacto (7 días).

**Secrets requeridos en GitHub (Settings → Secrets and variables → Actions):**

| Secret | Uso | Workflow |
|---|---|---|
| `ERP_USERNAME` | Usuario ERP para autenticación API | `APITest.yml:30` |
| `ERP_PASSWORD` | Contraseña ERP para autenticación API | `APITest.yml:31` |

**Artefactos y visualización:**
- E2E: `playwright-report` descargable desde la ejecución en pestaña **Actions** → run → **Artifacts**.
- API: `api-test-results` con `results.html` (reporte Bruno).

---

