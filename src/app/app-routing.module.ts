import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { InventarioOfflineComponent } from './pages/inventario-offline/inventario-offline.component';
import { InventarioComponent } from './pages/inventario/inventario.component';

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
    path: '**',
    redirectTo:'inventario'
  }
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
