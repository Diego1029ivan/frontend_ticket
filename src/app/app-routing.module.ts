import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioOfflineComponent } from './pages/inventario-offline/inventario-offline.component';
import { InventarioComponent } from './pages/inventario/inventario.component';
import { FiltroComponent } from './pages/filtro/filtro.component';

const routes: Routes = [
  
  {
    path:'inventario_off',
    component: InventarioOfflineComponent    
  },
  {
    path:'inventario',
    component: InventarioComponent    
  },
  {
    path:'inventario_filtro',
    component: FiltroComponent    
  },
  {
    path: '**',
    redirectTo:'inventario'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
