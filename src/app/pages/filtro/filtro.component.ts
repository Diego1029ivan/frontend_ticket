import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { Bien } from 'src/app/interfaces/bien';
import { InventarioService } from 'src/app/services/inventario.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css']
})
export class FiltroComponent implements OnInit{
  items:any
  header: string[] = [];
  itemParcial: any = [];
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  searchTerm = '';
  

  public urlCodigoBarra: string = environment.baseUrl;
 
  constructor(
    private inventarioService: InventarioService,
    private http: HttpClient
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
    this.refreshBien();
    
  }

  public refreshBien() {
    this.items = this.itemParcial
      .map((country: any, i: any) => ({ id: i + 1, ...country }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }

  search() {
    
    this.items = this.items.filter((item:any) =>
      item['DENOMINACION_BIEN'].toLowerCase().includes(this.searchTerm.toLowerCase()) ||
      item['ESTADO_BIEN'].toLowerCase().includes(this.searchTerm.toLowerCase())
    );
    this.collectionSize = this.filteredItems.length;
    this.page = 1;
  }

  // Función para obtener los datos de la tabla paginados y filtrados
  get filteredItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    return this.items?.slice(startIndex, endIndex);
  }

  

}
