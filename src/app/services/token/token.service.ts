import {Injectable} from '@angular/core';
import {LoginPage} from '../../pages/login/login.page';
import {jwt} from 'jsonwebtoken';

@Injectable({
    providedIn: 'root'
})
export class TokenService {

    public cont;

    constructor() {
    }

    handle($token, $data) {
        this.set($token, $data);
        console.log(this.isValid());
        return this.isValid();
    }


    set($token, $data) {
        localStorage.setItem('token', $token);
        localStorage.setItem('idUser', $data.userData._id);
        localStorage.setItem('name', $data.userData.name + ' ' + $data.userData.lastName);
        localStorage.setItem('email', $data.userData.email);
        localStorage.setItem('password', $data.userData.password);
        localStorage.setItem('telefono', $data.userData.phone);
        localStorage.setItem('status', $data.userData.status);
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
            status: localStorage.getItem('status')
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
        return '/';
    }

    isValid() {
        const token = this.get();
        if (token) {
            const payload = this.payload(token);
            if (payload) {
                return true;
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
