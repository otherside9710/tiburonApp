import {Injectable} from '@angular/core';
import {ToastController} from '@ionic/angular';
import {AlertController} from '@ionic/angular';

@Injectable({
    providedIn: 'root'
})
export class AlertService {
    toastinstance: any;
    private error = null;

    constructor(
        public toastCtrl: ToastController,
        public alertCtrl: AlertController
    ) {
    }

    handleResponse($title, $content) {
        return this.showMsg($title, $content);
    }

    handleError(error) {
        this.error = error.error.error ? error.error.error : error.message.message;
        this.showMsg('Error al salir', 'Verifique su conexion a internet.');
    }

    showAlert($msg) {
        this.toastinstance = this.toastCtrl.create(
            {
                message: $msg,
                position: 'bottom',
                duration: 3000
            }
        );
        this.toastinstance.present();
    }

    async showMsg($title, $content) {
        const alert = await this.alertCtrl.create({
            header: $title,
            message: $content,
            buttons: ['OK']
        });
        await alert.present();
    }

}
