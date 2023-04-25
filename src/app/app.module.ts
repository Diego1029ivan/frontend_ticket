import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InventarioOfflineComponent } from './pages/inventario-offline/inventario-offline.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBoostrapModule } from './ng-boostrap/ng-boostrap.module';
import { FiltroPipe } from './pipes/filtro.pipe';
import { FiltroComponent } from './pages/filtro/filtro.component';
import { UserComponent } from './pages/user/user.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { RegisterComponent } from './pages/Auth/register/register.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    InventarioOfflineComponent,
    FiltroPipe,
    FiltroComponent,
    UserComponent,
    LoginComponent,
    RegisterComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgBoostrapModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
