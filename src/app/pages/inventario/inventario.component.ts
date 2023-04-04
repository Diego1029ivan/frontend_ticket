import { Component } from '@angular/core';
import { Inventario } from 'src/app/interfaces/inventario';
import { InventarioService } from 'src/app/services/inventario.service';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css']
})
export class InventarioComponent {
      public urlCodigoBarra: string =
      'http://localhost:8012/backend_ticket/inventarioBarra';
    constructor(private inventarioService: InventarioService) {}
    inventarios: Inventario[] = [];
    ngOnInit(): void {
      this.inventarioService.getInventario().subscribe((inventario) => {
        this.inventarios = inventario;
      });
    }
    title = 'front_ticket';
}
