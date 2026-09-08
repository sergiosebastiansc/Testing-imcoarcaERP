class BillPage{
    constructor (page) {
        this.url='https://imcoarca.leonardojose.dev/facturas-de-venta'
        this.page=page;
        this.btnAddFactura= page.getByRole('button', { name: 'Crear Factura de Venta' })
        this.codOrigen= page.getByRole('textbox', { name: 'Código...' }).first()
        this.btnBuscNameOrigen= page.getByRole('button', { name: 'Buscar' }).first()
        this.serie= page.locator('[name="series"]')
        this.codComprador= page.getByRole('textbox', { name: 'Código...' }).nth(3)
        this.btnBuscNameComprador= page.getByRole('button', { name: 'Buscar' }).nth(4)
        this.selecNameComprador= page.getByRole('cell', { name: 'COMPRADOR' })
        this.numOrdenCompra= page.locator('[name="purchase_order_number"]')
        this.codCliente= page.getByRole('textbox', { name: 'Código...' }).nth(1)
        this.btnBuscNameCliente= page.getByRole('button', { name: 'Buscar' }).nth(2)
        this.nameBusqueda= page.getByRole('textbox', { name: 'Buscar por nombre, código...' })
        this.btnClienteBusqueda= page.locator('.inline-flex.items-center.px-4.py-2.text-sm.font-medium.text-white.bg-indigo-600.border.border-transparent.rounded-r-md')
        this.selecNameCliente= page.getByRole('cell', { name: '00118' })
        this.fechaFactura= page.locator('[name="invoice_date"]')
        this.codTransporte= page.getByRole('textbox', { name: 'Código...' }).nth(4)
        this.btnBuscNameTransporte= page.getByRole('button', { name: 'Buscar' }).nth(5)
        this.selecNameTransporte= page.getByRole('cell', { name: 'TRANSPORTE' })
        this.dirEntrega= page.locator('select[name="delivery_address_selector"]')
        this.nuevaDir= page.getByRole('textbox', { name: 'Ingrese la nueva dirección de entrega' })
        this.codVendedor= page.getByRole('textbox', { name: 'Código...' }).nth(2)
        this.btnBuscVendedor= page.getByRole('button', { name: 'Buscar' }).nth(3)
        this.selecNameVendedor= page.getByRole('cell', { name: 'VENDEDOR 01' })
        this.fechaEntrega= page.locator('[name="delivery_date"]')
        this.codMoneda=page.getByRole('textbox', { name: 'Código...' }).nth(5)
        this.btnBuscMoneda= page.getByRole('button', { name: 'Buscar' }).nth(6)
        this.selecNameMoneda= page.getByRole('cell', { name: 'PESOS ARGENTINOS' })
        this.TipoCambio= page.locator('[name="exchange_rate"]')
        this.checkVerEnDolar= page.getByRole('checkbox', { name: 'Mostrar valor en dolares' })
        this.btnAddItem= page.getByRole('button', { name: 'Agregar Ítem' })
        this.codItem= page.locator('.px-3 > .flex.w-full > .relative.w-1\\/3 > .block')
        this.btnBuscItem= page.locator('.px-3 > .flex.w-full > .relative.flex-1 > .absolute.inset-y-0.right-0')
        this.nameitem= page.getByRole('textbox', { name: 'Buscar por nombre, código...' })
        this.selecNameItem= page.getByText('Teclado Tester', { exact: true })
        this.Cantidad= page.locator('input[name="quantity"]')
        this.precioUnidad= page.locator('input[name="unit_price"]')
        this.observaciones= page.locator('[name="notes"]')
        this.btnSaveFactura= page.getByRole('button', { name: 'Guardar Factura' })

    }

    async clickAddFactura () {
       await this.btnAddFactura.click()
    }

    async llenarCodCliente (value){
        await this.codCliente.fill(value)
    }

    async clickBuscCliente (){
        await this.btnBuscNameCliente.click()
        
    }

    async selecCliente (value){
        await this.nameBusqueda.fill(value)
        await this.page.locator('.border-4').waitFor({ state: 'hidden' })
        await this.btnClienteBusqueda.click()
        await this.page.locator('.border-4').waitFor({ state: 'hidden' })
        await this.selecNameCliente.click()
    }

    async llenarCodVendedor (value) {
        await this.codVendedor.fill(value)
    }

    async clickBuscVendedor() {
        
        await this.btnBuscVendedor.click()
    }

    async selecVendedor(){
       
        await this.selecNameVendedor.click()
    }

    async selecSerie(){
        await this.serie.selectOption('A')
        //await this.serie.selectOption('B')
        //await this.serie.selectOption('C')
    }
    async llenarFechaFactura(value){
        await this.fechaFactura.click()
        await this.fechaFactura.clear();
        await this.fechaFactura.pressSequentially(value)
    }

    async llenarFechaEntrega(value){
        await this.fechaEntrega.click()
        await this.fechaEntrega.pressSequentially (value)
    }

    async llenarCodComprador(value){
        await this.codComprador.fill(value)
    }

    async clickBuscComprador(){
        await this.btnBuscNameComprador.click()
    }

    async selecComprador(){
        await this.page.locator('.border-4').waitFor({ state: 'hidden' })
        await this.selecNameComprador.click()
    }

    async llenarCodTransporte(value){
        await this.codTransporte.fill(value)
    }

    async clickBuscTransporte(){
        await this.btnBuscNameTransporte.click()
    }

    async selecTransporte(){
        await this.page.locator('.border-4').waitFor({ state: 'hidden' })
        await this.selecNameTransporte.click()
    }

    async llenarCodMoneda(value){
        await this.codMoneda.fill(value)
    }

    async clickBuscMoneda(){
        await this.btnBuscMoneda.click()
    }

    async selecMoneda(){
        await this.selecNameMoneda.click()
    }

    async llenarNumCompra(value){
        await this.numOrdenCompra.fill(value)
    }

    async selecDirEntrega(){
        await this.dirEntrega.selectOption('--- Ingresar Otra Dirección ---')
    }

    async llenarDireccion(value){
        await this.nuevaDir.fill(value)
    }

    async clickValorDolar(){
        await this.checkVerEnDolar.click()
    }

    async clickAddItem(){
        await this.btnAddItem.click()
    }

    async llenarCodItem(value){
        await this.codItem.fill(value)
        
    }

    

    async SelecItem(value){
        await this.btnBuscItem.click()
        await this.nameitem.fill(value)
        await this.page.getByText('Teclado Tester', { exact: true }).first().waitFor({ state: 'visible' });
        await this.page.getByText('Teclado Tester', { exact: true }).first().click()
        await this.page.locator("//input[@value='Teclado Tester']").waitFor({ state: 'visible' })
        
    }

    async llenarObs(value){
        await this.observaciones.fill(value)
    }

    async clickSaveFactura(){
        await this.btnSaveFactura.click()
    }

    async facturaVacia(){
         await this.page.goto(this.url)
         await this.clickAddFactura()
         await this.clickSaveFactura()
    }

    async facturaIncompleta(
        codCliente,
        selecCliente,
        codVendedor,
        fechaFactura,
        fechaEntrega,
        codComprador,
        codTransporte,
        codMoneda,
        numOrdenCompra,
        nuevaDir,
    ){
        await this.page.goto(this.url)
        await this.clickAddFactura()
        await this.llenarCodCliente(codCliente)
        await this.clickBuscCliente()
        await this.selecCliente(selecCliente)
        await this.llenarCodVendedor(codVendedor)
        await this.clickBuscVendedor()
        await this.selecVendedor()
        await this.selecSerie()
        await this.llenarFechaFactura(fechaFactura)
        await this.llenarFechaEntrega(fechaEntrega)
        await this.llenarCodComprador(codComprador)
        await this.clickBuscComprador()
        await this.selecComprador()
        await this.llenarCodTransporte(codTransporte)
        await this.clickBuscTransporte()
        await this.selecTransporte()
        await this.llenarCodMoneda(codMoneda)
        await this.clickBuscMoneda()
        await this.selecMoneda()
        await this.llenarNumCompra(numOrdenCompra)
        await this.selecDirEntrega()
        await this.llenarDireccion(nuevaDir)
        await this.clickValorDolar()
        await this.clickSaveFactura()
    }

    async AgregarFactura(
        codCliente,
        selecCliente,
        codVendedor,
        fechaFactura,
        fechaEntrega,
        codComprador,
        codTransporte,
        codMoneda,
        numOrdenCompra,
        nuevaDir,
        codItem,
        nameItem,
        observaciones)
        
        {
        await this.page.goto(this.url)
        await this.clickAddFactura()
        await this.llenarCodCliente(codCliente)
        await this.clickBuscCliente()
        await this.selecCliente(selecCliente)
       
        await this.llenarCodVendedor(codVendedor)
        await this.clickBuscVendedor()
        await this.selecVendedor()
        await this.selecSerie()
        await this.llenarFechaFactura(fechaFactura)
        await this.llenarFechaEntrega(fechaEntrega)
        await this.llenarCodComprador(codComprador)
        await this.clickBuscComprador()
        await this.selecComprador()
        await this.llenarCodTransporte(codTransporte)
        await this.clickBuscTransporte()
        await this.selecTransporte()
        await this.llenarCodMoneda(codMoneda)
        await this.clickBuscMoneda()
        await this.selecMoneda()
        await this.llenarNumCompra(numOrdenCompra)
        await this.selecDirEntrega()
        await this.llenarDireccion(nuevaDir)
        await this.clickValorDolar()
         await this.clickAddItem()
        await this.llenarCodItem(codItem)
        await this.SelecItem(nameItem)
        await this.llenarObs(observaciones)
        await this.clickSaveFactura()

    }
}

export default BillPage;