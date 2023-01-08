import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IframeComponent } from 'src/app/shared/components/iframe/iframe.component';
import { UsersComponent } from './users/users.component';
import { SettingsRoutingModule } from './settings-routing.module';


@NgModule({
  declarations: [
    UsersComponent,
  ],
  imports: [
    CommonModule,
    IframeComponent,
    SettingsRoutingModule
  ]
})
export class SettingsModule { }
