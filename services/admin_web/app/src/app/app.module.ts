import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';

// import { AngularFireFunctionsModule, USE_EMULATOR as USE_FUNCTIONS_EMULATOR } from '@angular/fire/functions';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { CoreModule } from './core/core.module';
import { FeaturesModule } from './features/features.module';

import {
  ApiModule as BackendApiModule,
  Configuration as BackendConfig,
  ConfigurationParameters as BackendConfigParams,
} from './core/api/backend';

export function backednConfigFactory(): BackendConfig {
  const params: BackendConfigParams = {
    basePath: environment.BACKEND_BASE_PATH,
    withCredentials: true,
    credentials: {
      // APIKeyQuery: environment.apiKeys.APIKeyQuery,
      // Auth0ImplicitBearer: environment.auth.clientId
    }
  };
  return new BackendConfig(params);
}

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AuthModule.forRoot({
      ...environment.auth,
      httpInterceptor: {
        allowedList: [`${environment.BACKEND_BASE_PATH}`],
      },
    }),
    BackendApiModule.forRoot(backednConfigFactory),
    CoreModule,
    FeaturesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
