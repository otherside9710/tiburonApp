import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {MenuPage} from './menu.page';

const routes: Routes = [
    {
        path: 'menu',
        component: MenuPage,
        children: [
            {path: 'login', loadChildren: '../login/login.module#LoginPageModule'},
            {path: 'signup', loadChildren: '../signup/signup.module#SignupPageModule'},
        ]
    },
    {
        path: '',
        redirectTo: '/menu/login'
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [MenuPage]
})
export class MenuPageModule {
}
