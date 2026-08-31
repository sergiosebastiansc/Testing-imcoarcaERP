class ArticlesPage {
    constructor (page) {
        this.url= 'https://imcoarca.leonardojose.dev/articulos';
        this.page=page;
        this.btnAddArticle= page.getByRole('button', { name: 'Crear Artículo' });
        this.skuCode= page.getByRole('textbox', { name: 'Código (SKU) *' });
        this.articleName= page.getByRole('textbox', { name: 'Nombre / Descripción Breve *' });
        this.articleDescription= page.getByRole('textbox', { name: 'Descripción Larga' });
        this.articleLine= page.getByRole('combobox', { name: 'Línea *' });
        this.articleCategory= page.getByRole('combobox', { name: 'Categoría *' });
        this.articleUnit= page.getByRole('textbox', { name: 'Unidad de Medida' });
        this.articleState= page.getByRole('combobox', { name: 'Estado' });
        this.articleNumber= page.getByRole('textbox', { name: 'Número de Artículo (Legado)' });
        this.fabrication= page.getByRole('combobox', { name: 'Fabricación propia' });
        this.salePrice= page.getByRole('textbox', { name: 'Precio de Venta' });
        this.articleCost= page.getByRole('textbox', { name: 'Costo' });
        this.lastPriceDate= page.getByLabel('Fecha Ult. Precio');
        this.purchasePrice= page.getByRole('textbox', { name: 'Precio de Compra' });
        this.multiplier= page.getByRole('textbox', { name: 'Multiplicador' });
        this.currency= page.getByRole('combobox', { name: 'Moneda de Costo' });
        this.currentStock= page.getByRole('textbox', { name: 'Stock Actual' })
        this.minStock= page.getByRole('textbox', { name: 'Stock Mínimo' })
        this.numberOfOrders= page.getByRole('textbox', { name: 'Cantidad en Pedidos' });
        this.delayDays= page.getByRole('textbox', { name: 'Días de Demora (Proveedor)' });
        this.quantityPackage= page.getByRole('textbox', { name: 'Cantidad por Bulto' });
        this.iva21= page.getByRole('checkbox', { name: 'IVA-21 (21%)' });
        this.iva10= page.getByRole('checkbox', { name: 'IVA-10 (10.5%)' });
        this.iva27= page.getByRole('checkbox', { name: 'IVA-27 (27%)' });
        this.btnSave= page.getByRole('button', { name: 'Guardar Cambios' });
    }

    async clickearBtnCrearArt () {
        await this.btnAddArticle.click()
    }

    async llenarSku (value) {
        await this.skuCode.fill(value)

    }

    async llenarNombre (value) {
        await this.articleName.fill(value)

    }

    async llenarDescripcion (value) {
        await this.articleDescription.fill(value)

    }

    async seleccionLinea (){
        await this.articleLine.selectOption('LINEA 1')

    }

    async seleccionCategoria () {
        await this.articleCategory.selectOption('CATEGORIA 1')

    }
    
    async llenarUnidMedida (value) {
        await this.articleUnit.fill(value)

    }

    async seleccionEstado () {
        await this.articleState.selectOption('Activo')
        //await this.articleState.selectOption('Inactivo')

    }

    async llenarNumArt (value) {
        await this.articleNumber.fill(value)


    }

    async seleccionFabricacion () {
        await this.fabrication.selectOption('Si')
        //await this.fabrication.selectOption('No')

    }

    async llenarPrecioVenta (value){
        await this.salePrice.fill(value)


    }

    async llenarCosto (value) {
        await this.articleCost.fill(value)

    }

    async llenarLastDatePrice (value) {
        await this.lastPriceDate.fill(value)

    }

    async llenarPrecioCompra (value) {
        await this.purchasePrice.fill(value)

    }

    async llenarMultiplicador (value) {
        await this.multiplier.fill(value)

    }

    async seleccionCurrency () {
        await this.currency.selectOption('Pesos (ARS)')
        //await this.currency.selectOption('Dólares (USD)')

    }

    async llenarStockActual (value) {
        await this.currentStock.fill(value)

    }

    async llenarStockMinimo (value) {
        await this.minStock.fill(value)

    }

    async llenarCantidadPedidos (value) {
        await this.numberOfOrders.fill(value)

    }

    async llenarDiasDemora (value) {
        await this.delayDays.fill(value)

    }

    async llenarCantidadBulto (value) {
        await this.quantityPackage.fill(value)

    }

    async seleccionIVA (type = '21') {
        if (type === '21') await this.iva21.check();
        if (type === '10') await this.iva10.check();
        if (type === '27') await this.iva27.check();

    }

    async clickearBtnGuardar () {
        await this.btnSave.click()

    }
    
    async addArticle (
        skuCode,
        articleName,
        articleDescription,
        articleUnit,
        articleNumber,
        salePrice,
        articleCost,
        lastPriceDate,
        purchasePrice,
        multiplier,
        currentStock,
        minStock,
        numberOfOrders,
        delayDays,
        quantityPackage)

        {
            await this.page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' });
            await this.page.goto(this.url)
            await this.clickearBtnCrearArt()
            await this.llenarSku(skuCode)
            await this.llenarNombre(articleName)
            await this.llenarDescripcion(articleDescription)
            await this.seleccionLinea()
            await this.seleccionCategoria()
            await this.llenarUnidMedida(articleUnit)
            await this.seleccionEstado()
            await this.llenarNumArt(articleNumber)
            await this.seleccionFabricacion()
            await this.llenarPrecioVenta(salePrice)
            await this.llenarCosto(articleCost)
            await this.llenarLastDatePrice(lastPriceDate)
            await this.llenarPrecioCompra(purchasePrice)
            await this.llenarMultiplicador(multiplier)
            await this.seleccionCurrency()
            await this.llenarStockActual(currentStock)
            await this.llenarStockMinimo(minStock)
            await this.llenarCantidadPedidos(numberOfOrders)
            await this.llenarDiasDemora(delayDays)
            await this.llenarCantidadBulto(quantityPackage)
            await this.seleccionIVA()
            await this.clickearBtnGuardar()

    }
}

export default ArticlesPage;