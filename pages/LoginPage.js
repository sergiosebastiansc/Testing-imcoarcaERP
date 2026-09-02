class LoginPage {
    constructor(page) {
        this.url= 'https://imcoarca.leonardojose.dev/login';
        this.page=page;
        this.emailAdress=  page.getByRole('textbox', { name: 'Email' })
        this.password=  page.getByRole('textbox', { name: 'Contraseña' })
        this.btnLogin= page.getByRole('button', { name: 'Ingresar' })
    }

    async llenarEmailAdress(value){
        await this.emailAdress.fill(value);
    }

    async llenarPassword(value){
        await this.password.fill (value);
    }

    async clickBtnLogin(value){
        await this.btnLogin.click()

    }

    async login (emailAdress,password){
        await this.page.goto (this.url)
        await this.llenarEmailAdress(emailAdress);
        await this.llenarPassword(password);
        await this.clickBtnLogin()
        await this.page.getByRole('heading', { name: 'Dashboard' }).waitFor({ state: 'visible' });
    }
}

export default LoginPage;
