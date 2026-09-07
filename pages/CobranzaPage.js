class CobranzaPage{
    constructor (page){
        this.url='https://imcoarca.leonardojose.dev/cobranzas'
        this.page=page;
        this.btnAddCobranza= page.getByRole('button', { name: 'Crear Cobranza' })
        this.codCliente= page.getByRole('textbox', { name: 'Código...' })
        this.buscNombre= page.getByLabel('Buscar', { exact: true })
        this.selecCliente= page.getByRole('cell', { name: 'Cliente Automatizacion TAE' })
        this.fechaCobro= page.getByLabel('Fecha de Cobro')
        this.montoCobrar= page.locator(`//tr[td[contains(., '248')]]//input[@type='text']`)
        this.montoAllSaldo= page.getByRole('button', { name: 'Aplicar saldo completo ($ 100,00) para factura 248' })
        this.addMedioPago=  page.getByRole('button', { name: 'Añadir Medio' })
        this.metodoPago= page.getByRole('combobox', { name: 'Medio' })
        this.buscNameCuenta= page.locator("div[class='col-span-12 md:col-span-3'] button[aria-label='Buscar']")
        this.selecCuenta= page.getByRole('cell', { name: 'DISPONIBLE' })
        this.addMontoFinal= page.getByRole('button', { name: 'Completar valor con el faltante respecto al total aplicado' })
        this.btnSaveCobranza= page.getByRole('button', { name: 'Guardar Cobranza' })
        this.asert=page.getByText('Cobranza guardada con éxito!')
    }

    async clickAddCobranza (){
        await this.btnAddCobranza.click()
    }

    async irACobranza(){
        await this.page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' })
        await this.page.goto(this.url)
    }

    async llenarCodCliente (value){
        await this.codCliente.fill(value)
    }

    async selecBuscNombre (){
        await this.buscNombre.click()
    }

    async selecNombre (){
        await this.selecCliente.click()
    }

    async llenarFechaCobro (value) {
        await this.fechaCobro.fill(value)
    }

    async clickMontoCobrar(){
        await this.montoAllSaldo.waitFor({ state: 'visible' })
        await this.montoAllSaldo.click()

    }

    async llenarMontoExcesivo(value){
        await this.montoCobrar.fill(value)
    }

    async clickAddMedioPago(){
        await this.addMedioPago.click()
    }

    async selecMedioPago(){
        await this.metodoPago.selectOption('Efectivo')
    }

    async clickBuscCuenta(){
        await this.buscNameCuenta.click()
    }

    async selecCuentaCliente(){
        await this.selecCuenta.click()
    }

    async clickAddMontoFinal(){
        await this.addMontoFinal.click()
    }

    async clickSaveCobranza(){
        await this.btnSaveCobranza.click()
    }

    async cobranzaSinCliente(){
        await this.irACobranza()
        await this.clickAddCobranza()
        await this.clickSaveCobranza()
    }

    async AddCobranza(codCliente, fechaCobro){
        await this.irACobranza()
        await this.clickAddCobranza()
        await this.llenarCodCliente(codCliente)
        await this.selecBuscNombre()
        await this.selecNombre()
        await this.llenarFechaCobro(fechaCobro)
        await this.clickMontoCobrar()
        await this.clickAddMedioPago()
        await this.selecMedioPago()
        await this.clickBuscCuenta()
        await this.selecCuentaCliente()
        await this.clickAddMontoFinal()
        await this.clickSaveCobranza()
    }

    async cobranzaSinMedioPago(codCliente, fechaCobro){
        await this.irACobranza()    
        await this.clickAddCobranza()
        await this.llenarCodCliente(codCliente)
        await this.selecBuscNombre()
        await this.selecNombre()
        await this.llenarFechaCobro(fechaCobro)
        await this.clickMontoCobrar()
        await this.clickSaveCobranza()
    }

    async cobranzaMontoCobrar(codCliente, fechaCobro, montoExcesivo){
        await this.irACobranza()
        await this.clickAddCobranza()
        await this.llenarCodCliente(codCliente)
        await this.selecBuscNombre()
        await this.selecNombre()
        await this.llenarFechaCobro(fechaCobro)
        await this.montoCobrar.fill(montoExcesivo)
        await this.clickSaveCobranza()
    }

}

export default CobranzaPage;