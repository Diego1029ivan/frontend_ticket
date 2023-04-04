import { Component } from '@angular/core';
import { Inventario } from 'src/app/interfaces/inventario';
import { InventarioService } from 'src/app/services/inventario.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrls: ['./inventario.component.css'],
})
export class InventarioComponent {
  public urlCodigoBarra: string = environment.baseUrl;

  constructor(private inventarioService: InventarioService) {}
  inventarios: Inventario[] = [];
  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe((inventario) => {
      this.inventarios = inventario;
    });
  }
  title = 'front_ticket';
}
