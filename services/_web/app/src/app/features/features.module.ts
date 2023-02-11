import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { CoreModule } from '../core/core.module';
import { MaterialModule } from '../material.module';

import { HomeComponent } from './home/home.component';
import { SettingsModule } from './settings/settings.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    CommonModule,
    MaterialModule,
    CoreModule,
    SettingsModule
  ]
})
export class FeaturesModule { }
