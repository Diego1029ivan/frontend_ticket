import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioOfflineComponent } from './pages/inventario-offline/inventario-offline.component';
import { FiltroComponent } from './pages/filtro/filtro.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { HomeComponent } from './pages/home/home.component';
import { AuthGuard } from './guards/auth.guard';
const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'sistemaInventario',
    component: HomeComponent,
    children: [
      {
        path: 'inventario_off',
        component: InventarioOfflineComponent,
        canActivate: [AuthGuard],
        pathMatch: 'full',
      },
      {
        path: 'inventario_filtro',
        component: FiltroComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'inventario_off',
      },
    ],
  },

  {
    path: '**',
    redirectTo: 'auth',
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
