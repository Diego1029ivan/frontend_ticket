import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';

import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

import { InventarioOfflineComponent } from './pages/inventario-offline/inventario-offline.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBoostrapModule } from './ng-boostrap/ng-boostrap.module';
import { FiltroPipe } from './pipes/filtro.pipe';
import { FiltroComponent } from './pages/filtro/filtro.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { RegisterComponent } from './pages/Auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';


@NgModule({
  declarations: [
    AppComponent,
    InventarioOfflineComponent,
    FiltroPipe,
    FiltroComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    ReporteComponent,
    BarChartComponent,
    LineChartComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgBoostrapModule,
    ReactiveFormsModule,
    
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true,
    },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
