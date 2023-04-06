import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule } from '@angular/common/http';
import { InventarioOfflineComponent } from './pages/inventario-offline/inventario-offline.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgBoostrapModule } from './pages/ng-boostrap/ng-boostrap.module';

@NgModule({
  declarations: [AppComponent, InventarioOfflineComponent, InventarioComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NgbModule,
    NgBoostrapModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
