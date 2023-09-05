import { NgModule, isDevMode, InjectionToken } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { AuthModule, AuthHttpInterceptor } from '@auth0/auth0-angular';

import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';

import { HeadBarComponent } from './core/components/head-bar/head-bar.component';
import { MenuComponent } from './core/components/menu/menu.component';
import { IconModule } from './core/modules/icon/icon.module';
import { ApiModule, Configuration, ConfigurationParameters } from './core/api/qrs';
import { HomeModule } from './features/home/home.module';

import { environment } from 'src/environments/environment';
import { ServiceWorkerModule } from '@angular/service-worker';
import { SharedModule } from './shared/shared.module';
import { AuthHttpInterceptorExtendedService } from './core/services/auth-http-interceptor-extended.service';
import { BypassSecurityPipe } from './core/pipes/bypass-security.pipe';
import { CricketScoresPageModule } from './features/stadium/cricket-scores/cricket-scores.module';


export function apiConfigFactory(): Configuration {
  const params: ConfigurationParameters = {
    basePath: environment.QRS_API_BASE_PATH,
    withCredentials: true,
    credentials: {
      // APIKeyQuery: environment.apiKeys.APIKeyQuery,
      // Auth0ImplicitBearer: environment.auth.clientId
    }
  };
  return new Configuration(params);
}

@NgModule({
  declarations: [AppComponent, HeadBarComponent, MenuComponent],
  imports: [
    BrowserModule,
    IonicModule.forRoot(),
    AppRoutingModule,
    HttpClientModule,
    FontAwesomeModule,
    IconModule,
    HomeModule,
    SharedModule,
    CricketScoresPageModule,
    AuthModule.forRoot({
      ...environment.auth, httpInterceptor: {
        allowedList: [`${environment.QRS_API_AUTH_BASE_PATH}`],
      }
    }),
    ApiModule.forRoot(apiConfigFactory),
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: !isDevMode(),
      registrationStrategy: 'registerWhenStable:30000'
      // registrationStrategy: 'registerImmediately'
    }),
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthHttpInterceptorExtendedService,
    multi: true,
  },
  {
    provide: RouteReuseStrategy,
    useClass: IonicRouteStrategy
  }],
  bootstrap: [AppComponent],
})
export class AppModule {

}
