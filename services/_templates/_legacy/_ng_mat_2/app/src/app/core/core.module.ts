import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavComponent } from './components/nav/nav.component';
import { MaterialModule } from './modules/material.module';
import { AppRoutingModule } from '../app-routing.module';
import { AvatarComponent } from './components/avatar/avatar.component';
import { AuthButtonComponent } from './components/auth-button/auth-button.component';
import { ProfileComponent } from './components/profile/profile.component';
import { LoadingComponent } from './components/loading/loading.component';
import { AppsComponent } from './components/apps/apps.component';

@NgModule({
  declarations: [NavComponent, AvatarComponent, AuthButtonComponent, ProfileComponent, LoadingComponent, AppsComponent],
  imports: [CommonModule, AppRoutingModule, MaterialModule],
  exports: [NavComponent],
})
export class CoreModule {}
