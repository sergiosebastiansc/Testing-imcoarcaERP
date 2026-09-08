class ClientPage {
    constructor (page) {
        this.url = 'https://imcoarca.leonardojose.dev/clientes';
        this.page = page;
        this.btnAddClient = page.getByRole('button', { name: 'Crear Cliente' });
        this.cuit = page.getByRole('textbox', { name: 'CUIT *' });
        this.businessName = page.getByRole('textbox', { name: 'Nombre o Razón Social *' });
        this.taxCondition = page.getByRole('combobox', { name: 'Condición Tributaria' });
        this.retainsIva = page.getByRole('combobox', { name: 'Retiene IVA' });
        this.exporLaw = page.getByRole('combobox', { name: 'Aplica Ley de Exportación TDF' });
        this.invoiceSeries = page.getByRole('combobox', { name: 'Serie de Factura' });
        this.registrationDate = page.getByLabel('Fecha de alta');
        this.fiscalAddress = page.getByRole('textbox', { name: 'Domicilio Fiscal' });
        this.postalCode = page.getByRole('textbox', { name: 'Código Postal' });
        this.locality = page.getByRole('textbox', { name: 'Localidad', exact: true });
        this.phone = page.locator('#phone');
        this.whatsapp = page.getByRole('textbox', { name: 'WhatsApp' });
        this.email = page.locator('#email');        
        this.contactPerson = page.getByRole('textbox', { name: 'Persona de Contacto', exact: true });
        this.line = page.getByRole('textbox', { name: 'Rubro' });
        this.zone = page.getByRole('combobox', { name: 'Zona' });
        this.collectionAddress = page.getByRole('textbox', { name: 'Domicilio de Cobranza' });
        this.collectionLocality = page.getByRole('textbox', { name: 'Localidad de Cobranza' });
        this.collectionPostalCode = page.getByRole('textbox', { name: 'CP de Cobranza' });
        this.collectionContact = page.getByRole('textbox', { name: 'Contacto de Cobranza' });
        this.collectionPhone = page.locator('#collection_phone');
        this.collectionDays = page.getByRole('textbox', { name: 'Días de Cobranza' });
        this.collectionSchedule = page.getByRole('textbox', { name: 'Horario de Cobranza' });
        this.collectionObservations = page.getByRole('textbox', { name: 'Observaciones de Cobranza' });
        this.realTerm = page.getByRole('textbox', { name: 'Plazo Real' });
        this.collectionUrl = page.getByRole('textbox', { name: 'URL de portal de Cobros' });
        this.collectionPortalUser = page.getByRole('textbox', { name: 'Usuario de portal de Cobros' });
        this.collectionPortalKey = page.getByRole('textbox', { name: 'Clave de portal de Cobros' });
        this.generalObservations = page.getByRole('textbox', { name: 'Observaciones Generales' });
        this.paymentDays = page.getByRole('textbox', { name: 'Días de Pago' });
        this.creditLimit = page.getByRole('textbox', { name: 'Límite de Crédito' });
        this.exemptionLimit = page.getByRole('textbox', { name: 'Exención' });
        this.adherendFce = page.getByRole('combobox', { name: 'Adherido a FCE' });
        this.cbu = page.getByRole('textbox', { name: 'CBU' });        
        this.frozenClient = page.getByRole('combobox', { name: 'Cliente Congelado' });
        this.isProspect = page.getByRole('combobox', { name: 'Es Prospecto' });
        this.requestIvaCertificate = page.getByRole('combobox', { name: 'Pedir Constancia de IVA' });
        this.iva21 = page.getByRole('checkbox', { name: 'IVA-21 (21%)' });
        this.iva10 = page.getByRole('checkbox', { name: 'IVA-10 (10.5%)' });
        this.iva27 = page.getByRole('checkbox', { name: 'IVA-27 (27%)' });
        this.iibbMisiones = page.getByRole('checkbox', { name: 'Percepción de IIBB Misiones (3.31%)' });
        this.iibbMisionesMultilateral = page.getByRole('checkbox', { name: 'Percepción de IIBB Misiones - Convenio Multilateral (1.96%)' });
        this.btnSave = page.getByRole('button', { name: 'Guardar Cambios' });
    }
    async clickearBtnCrearCliente () {
        await this.btnAddClient.click()
    }

    async llenarCuit (value) {
        await this.cuit.fill(value)
    }
    async llenarRazonSocial (value) {
        await this.businessName.fill(value)
    }
    async seleccionCondicionTributaria () {
        await this.taxCondition.selectOption({ label:'IVA Responsable Inscripto' })
    }
    async seleccionRetieneIva () {
        await this.retainsIva.selectOption({ label:'Si' })
    }
    async seleccionLeyExportacion () {
        await this.exporLaw.selectOption({ label:'No' })
    }
    async llenarFechaAlta (value) {
        await this.registrationDate.fill(value)
    }
    async llenarDomicilioFiscal (value) {
        await this.fiscalAddress.fill(value)
    }
    async llenarCodigoPostal (value) {
        await this.postalCode.fill(value)
    }
    async llenarLocalidad (value) {
        await this.locality.fill(value)
    }
    async llenarTelefono (value) {
        await this.phone.fill(value)
    }
    async llenarWhatsApp (value) {
        await this.whatsapp.fill(value)
    }
    async llenarEmail (value) {
        await this.email.fill(value)
    }
    async llenarPersonaContacto (value) {
        await this.contactPerson.fill(value)
    }
    async llenarRubro (value) {
        await this.line.fill(value)
    }
    async seleccionZona () {
        await this.zone.selectOption({ label:'Zona 1' })
    }
    async llenarDomicilioCobranza (value) {
        await this.collectionAddress.fill(value)
    }
    async llenarLocalidadCobranza (value) {
        await this.collectionLocality.fill(value)
    }
    async llenarCpCobranza (value) {
        await this.collectionPostalCode.fill(value)
    }
    async llenarContactoCobranza (value) {
        await this.collectionContact.fill(value)
    }
    async llenarTelefonoCobranza (value) {
        await this.collectionPhone.fill(value)
    }
    async llenarDiasCobranza (value) {
        await this.collectionDays.fill(value)
    }
    async llenarHorarioCobranza (value) {
        await this.collectionSchedule.fill(value)
    }
    async llenarObservacionesCobranza (value) {
        await this.collectionObservations.fill(value)
    }
    async llenarPlazoReal (value) {
        await this.realTerm.fill(value)
    }
    async llenarUrlPortalCobros (value) {
        await this.collectionUrl.fill(value)
    }
    async llenarUsuarioPortalCobros (value) {
        await this.collectionPortalUser.fill(value)
    }
    async llenarClavePortalCobros (value) {
        await this.collectionPortalKey.fill(value)
    }
    async llenarObservacionesGenerales (value) {
        await this.generalObservations.fill(value)
    }
    async llenarDiasPago (value) {
        await this.paymentDays.fill(value)
    }
    async llenarLimiteCredito (value) {
        await this.creditLimit.fill(value)
    }
    async llenarExencion (value) {
        await this.exemptionLimit.fill(value)
    }
    async seleccionAdherenteFce () {
        await this.adherendFce.selectOption({ label:'Si' })
    }
    async llenarCbu (value) {
    await this.cbu.fill(value)
}
    async seleccionClienteCongelado () {
        await this.frozenClient.selectOption({ label:'No' })
    }
    async seleccionEsProspecto () {
        await this.isProspect.selectOption({ label:'No' })
    }
    async seleccionPedirConstanciaIva () {
        await this.requestIvaCertificate.selectOption({ label:'Si' })
    }
    async seleccionIva (type = '21') {
        if (type === '21') await this.iva21.check()
        if (type === '10') await this.iva10.check()
        if (type === '27') await this.iva27.check()
    }
async seleccionPercepcionIIBB () {
    await this.iibbMisiones.check()
}
async seleccionPercepcionIIBBMultilateral () {
    await this.iibbMisionesMultilateral.check()
}
async clickearBtnGuardar () {
    await this.btnSave.click()
}
async addClient (
        cuit,
        businessName,
        fiscalAddress,
        postalCode,
        locality,
        phone,
        whatsApp,
        email,
        contactPerson,
        line,
        collectionAddress,
        collectionLocality,
        collectionPostalCode,
        collectionContact,
        collectionPhone,
        collectionDays,
        collectionSchedule,
        realTerm,
        generalObservations,
        paymentDays,
        creditLimit,
        cbu) 
        {
            await this.page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' });
            await this.page.goto(this.url);
            await this.clickearBtnCrearCliente()
            await this.llenarCuit(cuit)
            await this.llenarRazonSocial(businessName)
            await this.seleccionCondicionTributaria()
            await this.seleccionRetieneIva()
            await this.seleccionLeyExportacion()
            await this.llenarDomicilioFiscal(fiscalAddress)
            await this.llenarCodigoPostal(postalCode)
            await this.llenarLocalidad(locality)
            await this.llenarTelefono(phone)
            await this.llenarWhatsApp(whatsApp)
            await this.llenarEmail(email)
            await this.llenarPersonaContacto(contactPerson)
            await this.llenarRubro(line)
            await this.llenarDomicilioCobranza(collectionAddress)
            await this.llenarLocalidadCobranza(collectionLocality)
            await this.llenarCpCobranza(collectionPostalCode)
            await this.llenarContactoCobranza(collectionContact)
            await this.llenarTelefonoCobranza(collectionPhone)
            await this.llenarDiasCobranza(collectionDays)
            await this.llenarHorarioCobranza(collectionSchedule)
            await this.llenarPlazoReal(realTerm)
            await this.llenarObservacionesGenerales(generalObservations)
            await this.llenarDiasPago(paymentDays)
            await this.llenarLimiteCredito(creditLimit)
            await this.seleccionAdherenteFce()
            await this.llenarCbu(cbu)
            await this.seleccionClienteCongelado()
            await this.seleccionEsProspecto()
            await this.seleccionPedirConstanciaIva()
            await this.seleccionIva()
            await this.clickearBtnGuardar()
        }
    }
export default ClientPage;
