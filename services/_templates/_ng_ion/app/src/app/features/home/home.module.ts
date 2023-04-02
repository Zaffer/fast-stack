import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { IonicModule } from '@ionic/angular';
import { IndexPage } from './pages/index/index.page';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';


@NgModule({
  imports: [
    CommonModule,
    IonicModule,
    HomeRoutingModule,
    FontAwesomeModule
  ],
  declarations: [IndexPage]
})
export class HomeModule { }
