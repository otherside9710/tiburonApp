import {Component, OnInit} from '@angular/core';
import {Router, RouterEvent} from '@angular/router';
import {NavController} from '@ionic/angular';

@Component({
    selector: 'app-menu',
    templateUrl: './menu.page.html',
    styleUrls: ['./menu.page.scss'],
})
export class MenuPage implements OnInit {

    public pages = [
        {
            title: 'Login',
            url: '/menu/login'
        },
        {
            title: 'Registro',
            url: '/menu/signup'
        },
    ];

    public pagesLogin = [
        {
            title: 'Inicio',
            url: '/menu/prueba'
        }
    ];

    selectedPath = '';

    constructor(private router: Router, private nav: NavController) {
        this.router.events.subscribe((event: RouterEvent) => {
            this.selectedPath = event.url;
        });
    }

    ngOnInit() {
    }

    public isLogged(): boolean {
        if (localStorage.getItem('idUser')) {
            return true;
        }
        return false;
    }

    public logout() {
        localStorage.clear();
        this.go('menu/login');
    }

    go($url) {
        return this.nav.navigateRoot($url);
    }

}
