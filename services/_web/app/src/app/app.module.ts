import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';

// import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

// import {
//   ApiModule,
//   Configuration,
//   ConfigurationParameters,
// } from './core/api/qrspace';
// import {
//   ApiModule as LivewireApiModule,
//   Configuration as LivewireConfig,
//   ConfigurationParameters as LivewireConfigParams,
// } from './core/api/livewire';

import { environment } from 'src/environments/environment';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features.module';



@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        allowedList: [`${environment._API_BASE_PATH_AUTH}`],
      },
    }),
    BrowserAnimationsModule,
    CoreModule,
    FeaturesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
