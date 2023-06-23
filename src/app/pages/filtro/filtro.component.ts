import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { NgbPaginationConfig } from '@ng-bootstrap/ng-bootstrap';
import { ItemsSelect } from 'src/app/interfaces/itemsSelect';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';

import { InventarioService } from 'src/app/services/inventario.service';
import { UserService } from 'src/app/services/user.service';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-filtro',
  templateUrl: './filtro.component.html',
  styleUrls: ['./filtro.component.css'],
  providers: [FiltroPipe],
})
export class FiltroComponent implements OnInit {
  items: any;
  header: string[] = [];
  itemParcial: any = [];
  itemParcial2: any = [];

  page: any;
  pageSize: number = 10;
  collectionSize: number = 0;
  searchTerm = '';
  //pagination
  currentPage = 1;
  itemsPerPage = 10;
  totalItems = 0;

  cargando: number = 2;
  total: number = 0;
  tablaFiltro: any = [];
  datafiltro: any = {};
  busqueda: string = '';

  public urlCodigoBarra: string = environment.baseUrl;
  username = JSON.parse(sessionStorage.getItem('usuario') || '{}');
  permidoscrud: any = {};
  cargando2: boolean = false;
  constructor(
    private inventarioService: InventarioService,
    private http: HttpClient,
    private filtro: FiltroPipe,
    private userService: UserService,
    private paginationConfig: NgbPaginationConfig
  ) {
    paginationConfig.boundaryLinks = true;
    paginationConfig.maxSize = 5;
    this.permisosporusuario();
    this.cargando2 = false;
  }

  ngOnInit(): void {
    let page = 0;
    let query = '';
    this.mostrarInventario(this.currentPage);
    this.cargando = 0;
    // this.inventarioService.getBienes().subscribe((respo) => {
    //   this.items = respo;
    //   console.log(this.items);
    //   // if (this.items.data != 0) {
    //   //   this.cargaTabla();
    //   // }
    // });
  }
  mostrarInventario(page: any) {
    this.inventarioService
      .getBienesPaginado(page, this.busqueda, this.pageSize)
      .subscribe(
        (respo: any) => {
          this.datafiltro = respo;
          console.log(this.datafiltro);
          this.totalItems = respo.data.total;
          this.cargando = 1;
        },
        (err) => {
          console.log(err);
        }
      );
  }
  onPageChange(page: number) {
    this.currentPage = page;
    this.mostrarInventario(this.currentPage);
  }
  permisosporusuario() {
    this.userService.getPermisourlLogeado(this.username.rol).subscribe(
      (data1) => {
        this.permidoscrud = data1.data;
        this.permidoscrud = this.permidoscrud.filter(
          (permiso: any) => permiso.route === './inventario_filtro'
        );
        this.cargando2 = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public cargaTabla() {
    this.header = Object.keys(this.items.data[0]);
    //console.log(this.header)
    this.collectionSize = this.items.data.length;
    this.total = this.collectionSize;
    this.itemParcial = this.items.data;
    this.itemParcial2 = this.items.data;
    // this.refreshBien();
  }

  public refreshBien(sort: number) {
    this.page = 1;
    this.currentPage = 1;
    this.itemsPerPage = sort;
    this.mostrarInventario(this.currentPage);
  }

  // search() {
  //   this.itemParcial = this.itemParcial2.filter(
  //     (item: any) =>
  //       item['denominacion_bien']
  //         .toLowerCase()
  //         .includes(this.searchTerm.toLowerCase()) ||
  //       item['estado_bien']
  //         .toLowerCase()
  //         .includes(this.searchTerm.toLowerCase())
  //   );
  //   this.page = 1;
  // }

  // Función para obtener los datos de la tabla paginados y filtrados
  get filteredItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    //this.collectionSize = this.itemParcial?.slice(startIndex, endIndex).length;
    return this.itemParcial?.slice(startIndex, endIndex);
  }

  actualizarBusqueda(event: KeyboardEvent) {
    this.busqueda = (event.target as HTMLInputElement).value;
    console.log(this.busqueda);

    this.page = 1;
    this.currentPage = 1;
    this.mostrarInventario(this.currentPage);
    // this.tablaFiltro = this.filtro.transform(this.itemParcial2, this.busqueda);
    // this.itemParcial = this.tablaFiltro;
    // this.itemParcial != null ? this.refreshBien() : console.log('buscando');
    // this.collectionSize = this.itemParcial.length;
    // this.total = this.itemParcial.length;
  }

  /*=========CheckBox=============*/
  maxSelected = 5;
  selectedCount = 0;
  arregloSelect: any[] = [];
  jsonSelect: ItemsSelect = {};

  getSelectedCount() {
    const checkboxes = document.querySelectorAll(
      'table input[type="checkbox"]'
    );
    let count = 0;
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked === true) {
        count++;
      }
      this.selectedCount = count;
    });
  }

  disableCheckboxes() {
    const checkboxes = document.querySelectorAll(
      'table input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox: any) => {
      if (
        this.selectedCount >= this.maxSelected &&
        checkbox.checked === false
      ) {
        checkbox.disabled = true;
      } else {
        checkbox.disabled = false;
      }
    });
  }

  imprimirPaquete() {
    const checkboxes = document.querySelectorAll(
      'table input[type="checkbox"]'
    );
    this.arregloSelect.splice(0, this.arregloSelect.length);
    this.jsonSelect = {};
    checkboxes.forEach((checkbox: any) => {
      if (checkbox.checked === true) {
        this.arregloSelect.push(checkbox.value);
      }
    });
    //equivalencia con nombre de variables
    for (let i = 0; i < this.maxSelected; i++) {
      if (!this.arregloSelect[i]) {
        this.arregloSelect[i] = null;
      }
      eval('this.jsonSelect.item' + i + '= this.arregloSelect[' + i + ']');
    }

    this.inventarioService
      .postpaqueteCodigo(this.jsonSelect)
      .subscribe((pdf: Blob) => {
        const blob = new Blob([pdf], { type: 'application/pdf' });
        const fileUrl = URL.createObjectURL(blob);
        window.open(fileUrl);
      });
  }
  generarFormato() {
    this.inventarioService.getFormato().subscribe(
      (response: Blob) => {
        const fileURL = URL.createObjectURL(response);

        // Descargar el archivo Excel
        const a = document.createElement('a');
        a.href = fileURL;
        a.download = 'formato.xlsm';
        a.click();
      },
      (error) => {
        // Manejo de errores
      }
    );
  }
}
