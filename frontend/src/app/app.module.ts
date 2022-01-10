import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BackendInterceptor } from './core/interceptors/backend.interceptor';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { Routes, RouterModule } from '@angular/router';
import { RoutesModule } from './routes/routes.module';

import { NavModule } from './nav/nav.module'

const routes: Routes = [ ];

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    SharedModule.forRoot(),
    HttpClientModule,
    RoutesModule,
    RouterModule.forRoot(routes, { useHash: true, relativeLinkResolution: 'legacy' }),
    NavModule
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: BackendInterceptor, multi: true },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
