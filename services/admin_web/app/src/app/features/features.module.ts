import { NgModule } from '@angular/core';

import { HomeComponent } from './home/home.component';
import { ActivityComponent } from './activity/activity.component';
import { AccessModule } from './access/access.module';


@NgModule({
  declarations: [
    HomeComponent,
    ActivityComponent,
  ],
  imports: [
    AccessModule
  ]
})
export class FeaturesModule { }
