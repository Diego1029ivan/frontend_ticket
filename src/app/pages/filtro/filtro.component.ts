import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';

import { InventarioService } from 'src/app/services/inventario.service';
import { environment } from 'src/environments/environment';


@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
  providers: [FiltroPipe]
})
export class FiltroComponent implements OnInit{
  items:any
  header: string[] = [];
  itemParcial: any = [];
  itemParcial2: any = [];
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  searchTerm = '';

  tablaFiltro: any = [];

  busqueda:string = '';
  

  public urlCodigoBarra: string = environment.baseUrl;
  
 
  constructor(
    private inventarioService: InventarioService,
    private http: HttpClient,
    private filtro: FiltroPipe
  ) {}

  ngOnInit(): void {
    this.inventarioService.getBienes().subscribe((respo)=>{
      this.items=respo
      this.cargaTabla()
    });
    
  }

  public cargaTabla() {
    console.log(this.items)
    this.header = Object.keys(this.items[0]);
    this.collectionSize = this.items.length;
    this.itemParcial = this.items;
    this.itemParcial2 = this.items;
    this.refreshBien();
    
  }

  public refreshBien() {
    this.items = this.filteredItems
      .map((country: any, i: any) => ({ id: i + 1, ...country }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  search() {
    
    this.itemParcial = this.itemParcial2.filter((item:any) =>
      item['DENOMINACION_BIEN'].toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item['ESTADO_BIEN'].toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.page = 1;
  }

  // Función para obtener los datos de la tabla paginados y filtrados
  get filteredItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.itemParcial?.slice(startIndex, endIndex);
  }

  actualizarBusqueda(event:KeyboardEvent) {
    this.busqueda = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.tablaFiltro = this.filtro.transform(this.itemParcial2,this.busqueda)
    this.itemParcial=this.tablaFiltro
    this.itemParcial!=null?this.refreshBien():console.log("buscando")
    //this.refreshInventario()
    console.log(this.busqueda, this.tablaFiltro)
    
  }
  

}
