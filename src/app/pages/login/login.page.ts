import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController, NavController} from '@ionic/angular';
import {ClienteService} from '../../services/client/cliente.service';
import {TokenService} from '../../services/token/token.service';

@Component({
    selector: 'app-login',
    templateUrl: './login.page.html',
    styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

    public form = {
        email: null,
        password: null
    };

    constructor(private router: Router,
                private loadingCtrl: LoadingController,
                private client: ClienteService,
                private Token: TokenService,
                private nav: NavController,
    ) {
    }

    onSubmit() {
        this.client.login(this.form).subscribe(
            data => this.handleResponse(data),
            error => this.alert(error.error)
        );
    }

    handleResponse($data) {
        const bool = this.Token.handle($data.token, $data);
        if (bool) {
            this.alert(`Bienvenido!! ${localStorage.getItem('name')}`);
            this.go('menu/prueba');
        } else {
            this.alert('error!');
            localStorage.clear();
        }
    }

    go($url) {
       return this.nav.navigateRoot($url);
    }

    ngOnInit() {
        this.presentAlert();
    }

    toSignup() {
        this.go('menu/signup');
    }

    async presentAlert() {
        const alert = await this.loadingCtrl.create({
            duration: 700,
            animated: true,
            message: 'Cargando..'
        });

        await alert.present();
    }

    async alert($msg) {
        const alert = await this.loadingCtrl.create({
            duration: 1100,
            animated: true,
            message: $msg
        });

        await alert.present();
    }
}
