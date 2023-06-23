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
    private userService: UserService,
    private paginationConfig: NgbPaginationConfig
  ) {
    paginationConfig.boundaryLinks = true;
    paginationConfig.maxSize = 5;
    this.permisosporusuario();
    this.cargando2 = false;
  }

  ngOnInit(): void {
    this.mostrarInventario(this.currentPage);
    this.cargando = 0;
  }
  mostrarInventario(page: any) {
    this.inventarioService
      .getBienesPaginado(page, this.busqueda, this.pageSize)
      .subscribe(
        (respo: any) => {
          this.datafiltro = respo;
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

  public refreshBien(sort: number) {
    this.page = 1;
    this.currentPage = 1;
    this.itemsPerPage = sort;
    this.mostrarInventario(this.currentPage);
  }

  actualizarBusqueda(event: KeyboardEvent) {
    this.busqueda = (event.target as HTMLInputElement).value;
    this.page = 1;
    this.currentPage = 1;
    this.mostrarInventario(this.currentPage);
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
        console.log(error);
      }
    );
  }
}
