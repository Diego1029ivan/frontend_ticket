import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioOfflineComponent } from './pages/inventario-offline/inventario-offline.component';
import { FiltroComponent } from './pages/filtro/filtro.component';
import { LoginComponent } from './pages/Auth/login/login.component';

const routes: Routes = [
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'inventario_off',
    component: InventarioOfflineComponent,
  },
  {
    path: 'inventario_filtro',
    component: FiltroComponent,
  },
  {
    path: '**',
    redirectTo: 'login',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
