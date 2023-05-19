import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioOfflineComponent } from './pages/inventario-offline/inventario-offline.component';
import { FiltroComponent } from './pages/filtro/filtro.component';
import { LoginComponent } from './pages/Auth/login/login.component';
import { ResetPasswordComponent } from './pages/Auth/reset-password/reset-password.component';

import { HomeComponent } from './pages/home/home.component';

import { AuthGuard } from './guards/auth.guard';
import { UserComponent } from './pages/user/user.component';
import { ReporteComponent } from './pages/reporte/reporte.component';
import { CambiarContraComponent } from './pages/cambiar-contra/cambiar-contra.component';
import { PerfilComponent } from './pages/perfil/perfil.component';
import { EstadosComponent } from './pages/estados/estados.component';

const routes: Routes = [
  {
    path: 'auth',
    component: LoginComponent,
  },
  {
    path: 'restablecerPassword',
    component: ResetPasswordComponent,
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
        path: 'usarios',
        component: UserComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'perfil',
        component: PerfilComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'ResetiarPassword',
        component: CambiarContraComponent,
        canActivate: [AuthGuard],
      },

      {
        path: 'reporte',
        component: ReporteComponent,
        canActivate: [AuthGuard],
      },
      {
        path: 'cambioQR',
        component: EstadosComponent,
        canActivate: [AuthGuard],
      },
      {
        path: '**',
        redirectTo: 'reporte',
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
