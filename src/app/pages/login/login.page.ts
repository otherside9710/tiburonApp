import {Component, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {LoadingController} from '@ionic/angular';

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
                private loadingCtrl: LoadingController
    ) {
    }

    ngOnInit() {
        this.presentAlert();
    }

    toSignup() {
        this.router.navigateByUrl('menu/login');
    }

    async presentAlert() {
        const alert = await this.loadingCtrl.create({
            duration: 900,
            animated: true,
            message: 'Cargando..'
        });

        await alert.present();
    }
}
