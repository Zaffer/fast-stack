import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { AccessModule } from './access/access.module';
import { MaterialModule } from '../shared/material.module';
import { PlotsModule } from '../shared/plots.module';


@NgModule({
  declarations: [
    HomeComponent,
    ActivityComponent,
  ],
  imports: [
    MaterialModule,
    PlotsModule,
    AccessModule
  ]
})
export class FeaturesModule { }
