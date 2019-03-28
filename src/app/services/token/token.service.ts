import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {LoginPage} from '../../pages/login/login.page';
import {AppPage} from '../../../../e2e/src/app.po';
import {browser} from 'protractor';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    public cont;


    private iss = {
        login: 'http://172.104.211.233/ettcurumaniServe/public/api/login',
        signup: 'http://172.104.211.233/ettcurumaniServe/public/api/signup'
    };

    constructor(public http: HttpClient, public nav: AppPage
    ) {

    }

    handle($token, $data) {
        this.set($token, $data);
        console.log(this.isValid());
        return this.isValid();
    }

    set($token, $data) {
        localStorage.setItem('token', $token);
        localStorage.setItem('idUser', $data.userData.id);
        localStorage.setItem('name', $data.userData.name);
        localStorage.setItem('email', $data.userData.email);
        localStorage.setItem('password', $data.userData.password);
        localStorage.setItem('telefono', $data.userData.telefono);
        localStorage.setItem('direccion', $data.userData.direccion);
        localStorage.setItem('placa', $data.userData.placa);
    }

    get() {
        return localStorage.getItem('token');
    }

    getDataUser() {
        const $array = {
            id: localStorage.getItem('idUser'),
            name: localStorage.getItem('name'),
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password'),
            telefono: localStorage.getItem('telefono'),
            direccion: localStorage.getItem('direccion'),
            placa: localStorage.getItem('placa')
        };
        return $array;
    }

    remove() {
        localStorage.removeItem('token');
    }

    removeAll() {
        localStorage.clear();
    }

    locationTo($page) {
        return browser.get('/');
    }

    isValid() {
        const token = this.get();
        if (token) {
            const payload = this.payload(token);
            if (payload) {
                return this.objectKeys(this.iss).indexOf(payload.iss) > -1 ? true : false;
            }
        }
        return false;
    }

    payload($token) {
        const payload = $token.split('.')[1];
        return this.decode(payload);
    }

    decode($payload) {
        return JSON.parse(atob($payload));
    }

    objectKeys($keys) {
        const values = Object.keys($keys).map(key => $keys[key]);
        const union = values.join(',');
        return union;
    }

    isLogged() {
        return this.isValid();
    }

    public backToLogin() {
        if (this.cont === 2) {
            const $token = this.get();
            if ($token === null) {
                this.locationTo(LoginPage);
            }
        }
        this.cont = 2;
    }

}
