import { NgModule } from '@angular/core';

import { HomeComponent } from './features/home/home.component';
import { SettingsModule } from './features/settings/settings.module';


@NgModule({
  declarations: [
    HomeComponent,
  ],
  imports: [
    SettingsModule
  ]
})
export class FeaturesModule { }
