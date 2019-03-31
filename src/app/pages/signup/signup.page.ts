import {AfterContentInit, Component, OnDestroy, OnInit} from '@angular/core';
import {LoadingController} from '@ionic/angular';
import {ClienteService} from '../../services/client/cliente.service';
import {AlertService} from '../../services/alert/alert.service';
import Swal from 'sweetalert2';
import {TokenService} from '../../services/token/token.service';


@Component({
    selector: 'app-signup',
    templateUrl: './signup.page.html',
    styleUrls: ['./signup.page.scss'],
})
export class SignupPage implements OnInit {

    public form = {
        name: null,
        email: null,
        telefono: null,
        direccion: null,
        password: null,
        password_confirmation: null,
    };

    public error = null;
    public success = null;

    constructor(private loadingCtrl: LoadingController,
                private Jarwis: ClienteService,
                public alert: AlertService,
                private Token: TokenService) {
    }

    ngOnInit() {
        this.presentAlert();
    }

    onSubmit() {
        this.Jarwis.signup(this.form).subscribe(
            data => {
                this.handleResponse(data);
            },
            error => this.handleError(error)
        );
    }

    handleResponse($data) {
        const bool = this.Token.handle($data.access_token, $data);
        if (bool) {
            this.alert.showMsg('Registrado Correctamente', 'Gracias Por Registrarse Señor(a) ' + $data.user);
            location.reload();
        }
    }

    handleError(error) {
        // TODO: Corregir esto por la validacion del servicio de Conexion a internet
        if (1 > 2) {
            Swal.fire('Error al regitrar usuario', 'Hubo un Error en el servidor.', 'error');
        } else {
            if (error.error.errors.email) {
                Swal.fire('Error al regitrar usuario', 'El Email No es valido, No puede contener caracteres especiales.', 'error');
            } else {
                if (error.error.error) {
                    this.error = error.error.error;
                    Swal.fire('Error al regitrar usuario', this.error, 'error');
                } else if (error.message.message) {
                    this.error = error.message.message;
                    Swal.fire('Error al regitrar usuario', this.error, 'error');
                } else if (error.error.message) {
                    this.error = error.error.message;
                    Swal.fire('Error al regitrar usuario', this.error, 'error');
                } else if (error.error.errors.password) {
                    this.error = error.error.errors.password;
                    Swal.fire('Error al regitrar usuario', this.error, 'error');
                }
            }
        }
    }

    async presentAlert() {
        const alert = await this.loadingCtrl.create({
            duration: 700,
            animated: true,
            message: 'Cargando..'
        });

        await alert.present();
    }

    onValidatePass() {
        const $pass = this.form.password;
        const $pass2 = this.form.password_confirmation;
        if ($pass != null && $pass2 != null) {
            if (!$pass.isEmpty && !$pass2.isEmpty) {
                if ($pass !== $pass2 || $pass2 !== $pass) {
                    Swal.fire('Contraseña Incorrecta', 'Las contraseñas no coinciden', 'warning');
                    this.form.password = null;
                    this.form.password_confirmation = null;
                }
            }
        }
    }
}
