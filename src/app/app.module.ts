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
import { ReactiveFormsModule } from '@angular/forms';
import { HomeComponent } from './pages/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { BarChartComponent } from './components/bar-chart/bar-chart.component';
import { LineChartComponent } from './components/line-chart/line-chart.component';
import { CargaComponent } from './components/carga/carga.component';
import { CambiarContraComponent } from './pages/cambiar-contra/cambiar-contra.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { DonachartComponent } from './components/donachart/donachart.component';
import { EstadosComponent } from './pages/estados/estados.component';
import { ResetPasswordComponent } from './pages/Auth/reset-password/reset-password.component';
import { LectorBarrasComponent } from './pages/lector-barras/lector-barras.component';
import { ReporteContableComponent } from './pages/reporte-contable/reporte-contable.component';
import { PolarChartComponent } from './components/polar-chart/polar-chart.component';
import { BarContaChartComponent } from './components/bar-conta-chart/bar-conta-chart.component';

@NgModule({
  declarations: [
    AppComponent,
    InventarioOfflineComponent,
    FiltroPipe,
    FiltroComponent,
    UserComponent,
    LoginComponent,
    HomeComponent,
    NavbarComponent,
    HeaderComponent,
    ReporteComponent,
    BarChartComponent,
    LineChartComponent,
    CargaComponent,
    CambiarContraComponent,
    PerfilComponent,
    DonachartComponent,
    EstadosComponent,
    ResetPasswordComponent,
    LectorBarrasComponent,
    ReporteContableComponent,
    PolarChartComponent,
    BarContaChartComponent,
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
