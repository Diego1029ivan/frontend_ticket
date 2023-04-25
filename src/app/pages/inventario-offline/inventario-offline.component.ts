import { Component } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { Bien } from 'src/app/interfaces/bien';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { catchError, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario-offline',
  templateUrl: './inventario-offline.component.html',
  styleUrls: ['./inventario-offline.component.css'],
  providers: [FiltroPipe],
})
export class InventarioOfflineComponent {
  public urlCodigoBarra: string = environment.baseUrl;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  data: Bien[] = [];
  valor: Boolean = false;

  tablaParcial: any = [];
  tablaParcial2: any = [];
  tablaFiltro: any = [];
  busqueda: string = '';
  file: File | null = null;
  header: string[] = [];
  constructor(
    private inventarioService: InventarioService,
    private authService: AuthService,
    private router: Router,
    private filtro: FiltroPipe
  ) {}

  onFileChange(ev: any) {
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
      this.collectionSize = this.data.length;

      this.tablaParcial = this.data;
      this.tablaParcial2 = this.data;
      console.log(this.data);
      this.refreshInventario();
    };
    reader.readAsBinaryString(file);
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

  /*====== POST ========*/
  enviarBienes(): void {
    for (let i = 0; i < this.tablaParcial.length; i++) {
      //console.log(this.tablaParcial[i])

      this.tablaParcial[i]['FECHA_DOCUMENTO_ADQUIS'] = moment(
        this.tablaParcial[i]['FECHA_DOCUMENTO_ADQUIS'],
        'DD/MM/YYYY'
      ).format('YYYY-MM-DD');
      //console.log(this.tablaParcial[i]['FECHA_DOCUMENTO_ADQUIS'])

      this.tablaParcial[i]['NOM_EST_BIEN'] =
        this.tablaParcial[i]['NOM_EST_BIEN'].charAt(0);
      //console.log(this.tablaParcial[i]['NOM_EST_BIEN'])
      this.tablaParcial[i]['CONDICION'] =
        this.tablaParcial[i]['CONDICION'].charAt(0);
      //console.log(this.tablaParcial[i]['CONDICION'])

      this.inventarioService
        .getCodigo(String(this.tablaParcial[i]['CODIGO_PATRIMONIAL']))
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })
        )
        .subscribe({
          next: (data) => {
            console.log('ya existe en la base de datos');
          },
        });

      this.inventarioService
        .postLista(this.tablaParcial[i])
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })
        )
        .subscribe({
          next: (data) => {
            console.log('Enviando objeto');
          },
          error: (error) => {
            try {
              // intentar manejar el error
              if (error.status === 500) {
                console.log('No se puede enviar');
              } else {
                // hacer algo para otros errores
              }
            } catch (e) {
              console.log(e);
            }
          },
        });
    }
  }

  /*======  logout========*/
  logout(): void {
    this.authService.logout();
    alert('Sesión cerrada');
    this.router.navigate(['login']);
  }
}
