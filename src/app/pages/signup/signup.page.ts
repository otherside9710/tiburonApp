import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';

@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    constructor(private loadingCtrl: LoadingController) {
    }

    ngOnInit() {
        this.presentAlert();
    }

    async presentAlert() {
        const alert = await this.loadingCtrl.create({
            duration: 700,
            animated: true,
            message: 'Cargando..'
        });

        await alert.present();
    }
}
