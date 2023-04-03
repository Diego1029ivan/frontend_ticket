import { Component, OnInit } from '@angular/core';
import { Inventario } from './interfaces/inventario';
import { InventarioService } from './services/inventario.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  public urlCodigoBarra: string =
    'http://localhost:8012/backend_ticket/inventarioBarra';
  constructor(private inventarioService: InventarioService) {}
  inventarios: Inventario[] = [];
  ngOnInit(): void {
    this.inventarioService.getInventario().subscribe((inventario) => {
      this.inventarios = inventario;
    });
    //mostrar el inventario por codigo de barras
  }
  title = 'front_ticket';
  mostrarCodigoBarra(idCogoBarra: string) {}
}
