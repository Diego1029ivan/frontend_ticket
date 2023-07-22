import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import { Bien } from 'src/app/interfaces/bien';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { catchError, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-inventario-offline',
  templateUrl: './inventario-offline.component.html',
  styleUrls: ['./inventario-offline.component.css'],
  providers: [FiltroPipe, DatePipe],
})
export class InventarioOfflineComponent implements OnInit, AfterViewInit {
  public urlCodigoBarra: string = environment.baseUrl;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  data: Bien[] = [];
  valor: Boolean = false;
  cargando: number = 2;

  tablaParcial: any = [];
  tablaParcial2: any = [];
  tablaFiltro: any = [];
  busqueda: string = '';
  file: File | null = null;
  header: string[] = [];
  username = JSON.parse(localStorage.getItem('usuario') || '{}');
  permidoscrud: any = {};
  cargando2: boolean = false;

  numeroFecha = 43816;
  fechaLegible: any;
  constructor(
    private inventarioService: InventarioService,
    private authService: AuthService,
    private filtro: FiltroPipe,
    private userService: UserService,
    private datePipe: DatePipe
  ) {
    this.permisosporusuario();
    this.cargando2 = false;
  }
  ngAfterViewInit(): void {}
  ngOnInit(): void {}

  onFileChange(ev: any) {
    this.cargando = 0;
    let workBook: any = null;
    let jsonData: any = null;
    const reader = new FileReader();
    const file = ev.target.files[0];
    const allowedExtensions = ['.xlsx', '.xls'];
    const fileExtension = file.name
      .substr(file.name.lastIndexOf('.'))
      .toLowerCase();

    if (!allowedExtensions.includes(fileExtension)) {
      alert('Solo se permiten archivos de Excel (.xlsx o .xls)');
      ev.target.value = '';
      return;
    }

    reader.onload = (event) => {
      const data = reader.result;
      workBook = XLSX.read(data, { type: 'binary' });
      jsonData = workBook.SheetNames.reduce((initial: any, name: any) => {
        const sheet = workBook.Sheets[name];
        initial[name] = XLSX.utils.sheet_to_json(sheet);
        return initial;
      }, {});
      this.data = jsonData[Object.keys(jsonData)[0]];

      this.header = Object.keys(this.data[0]);

      // Convertir números de fecha a objetos Date
      this.data.forEach((item: any) => {
        const fechaExcel = new Date(
          Math.floor((item.FECHA_DOCUMENTO_ADQUIS - 25569) * 86400 * 1000)
        );
        const offset = fechaExcel.getTimezoneOffset() * 60 * 1000; // Obtener el desplazamiento de zona horaria en milisegundos
        const fechaLegible = this.datePipe.transform(
          new Date(fechaExcel.getTime() + offset),
          'dd/MM/yyyy'
        );
        console.log(item.FECHA_DOCUMENTO_ADQUIS);

        item.FECHA_DOCUMENTO_ADQUIS = fechaLegible;
        item.NOM_EST_BIEN = item.NOM_EST_BIEN.charAt(0);
        item.CONDICION = item.CONDICION.charAt(0);
      });

      this.collectionSize = this.data.length;

      this.tablaParcial = this.data;
      this.tablaParcial = this.data;
      this.refreshInventario();
      this.cargando = 1;
    };
    reader.readAsBinaryString(file);
  }
  permisosporusuario() {
    this.userService.getPermisourlLogeado(this.username.rol).subscribe(
      (data1) => {
        this.permidoscrud = data1.data;
        this.permidoscrud = this.permidoscrud.filter(
          (permiso: any) => permiso.route === './inventario_off'
        );
        this.cargando2 = true;
      },
      (err) => {
        console.log(err);
      }
    );
  }
  public refreshInventario() {
    this.data = this.tablaParcial
      .map((country: any, i: any) => ({ id: i + 1, ...country }))
      .slice(
        (this.page - 1) * this.pageSize,
        (this.page - 1) * this.pageSize + this.pageSize
      );
  }
  /*=========Total de tabla ========*/
  get filteredItems() {
    const startIndex = (this.page - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    this.page = 1;
    return this.tablaParcial?.slice(startIndex, endIndex);
  }

  /*====== POST EXCEL========*/
  subir: boolean = false;
  enviarBienes(): void {
    this.subir == true;
    console.log(this.tablaParcial);
    this.inventarioService
      .postLista(this.tablaParcial)
      .pipe(
        catchError((error: HttpErrorResponse) => {
          return throwError(error);
        })
      )
      .subscribe(
        (respo) => {
          console.log(respo);
          this.subir == false;
        },
        (error) => {
          console.log(error);
        }
      );
    //}
  }
}
