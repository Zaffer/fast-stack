import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MaterialModule } from 'src/app/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { NavComponent } from './components/nav/nav.component';
import { MenuComponent } from './components/menu/menu.component';
import { LoginButtonComponent } from './components/login-button/login-button.component';
import { LogoutButtonComponent } from './components/logout-button/logout-button.component';
import { SignupButtonComponent } from './components/signup-button/signup-button.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { AvatarComponent } from './components/avatar/avatar.component';
import { LoadingComponent } from './components/loading/loading.component';

@NgModule({
  declarations: [
    NavComponent,
    MenuComponent,
    AuthButtonComponent,
    ProfileComponent,
    AvatarComponent,
    LoginButtonComponent,
    LogoutButtonComponent,
    SignupButtonComponent,
    LoadingComponent,
  ],
  imports: [
    CommonModule,
    AppRoutingModule,
    MaterialModule,
  ],
  exports: [
    NavComponent,
    MenuComponent,
    LoadingComponent
  ],
  providers: [
  ]
})
export class CoreModule { }
