import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {Routes, RouterModule} from '@angular/router';

import {IonicModule} from '@ionic/angular';

import {PruebaPage} from './prueba.page';
import {SliderPageModule} from '../slider/slider.module';
import {SliderPage} from '../slider/slider.page';
import {TabsPageModule} from '../tabs/tabs.module';
import {TabsPageRoutingModule} from '../tabs/tabs.router.module';

const routes: Routes = [
    {
        path: '',
        component: PruebaPage
    }
];

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        RouterModule.forChild(routes)
    ],
    declarations: [PruebaPage]
})
export class PruebaPageModule {
}
