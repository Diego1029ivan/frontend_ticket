import { AfterViewInit, Component, OnInit } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { Bien } from 'src/app/interfaces/bien';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { catchError, delay, of, throwError } from 'rxjs';
import { HttpErrorResponse } from '@angular/common/http';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';





@Component({
  selector: 'app-inventario-offline',
  templateUrl: './inventario-offline.component.html',
  styleUrls: ['./inventario-offline.component.css'],
  providers: [FiltroPipe],
})
export class InventarioOfflineComponent implements OnInit,AfterViewInit {
  public urlCodigoBarra: string = environment.baseUrl;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  data: Bien[] = [];
  valor: Boolean = false;
  cargando: number=2 ;

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
  ) {
    
  }
  ngAfterViewInit(): void {
    
    
    
  }
  ngOnInit(): void {
    
   
    
  }

  onFileChange(ev: any) {
    this.cargando=0;
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
        // Reemplaza "numeroFecha" con el nombre de la propiedad que contiene el número de fecha en tu objeto de datos
        item.FECHA_DOCUMENTO_ADQUIS = new Date(item.FECHA_DOCUMENTO_ADQUIS);
        // Obtener los componentes de la fecha
        const year = item.FECHA_DOCUMENTO_ADQUIS.getFullYear();
        const month = ("0" + (item.FECHA_DOCUMENTO_ADQUIS.getMonth() + 1)).slice(-2);
        const day = ("0" + item.FECHA_DOCUMENTO_ADQUIS.getDate()).slice(-2);

        // Crear la cadena de fecha en formato MySQL
        item.FECHA_DOCUMENTO_ADQUIS = `${year}-${month}-${day}`;
        item.NOM_EST_BIEN=item.NOM_EST_BIEN.charAt(0);
        item.CONDICION=item.CONDICION.charAt(0);
      });
      //console.log(this.header)
      this.collectionSize = this.data.length;

      this.tablaParcial = this.data;
      this.tablaParcial2 = this.data;
      //console.log(this.data);
      this.refreshInventario();
      this.cargando=1;
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
  dimensionPaquete=50;
  delayTime = 2000; 
  enviarBienes(): void {
    // for (let i = 0; i < this.tablaParcial.length; i += this.dimensionPaquete) {
    //   const paquete = this.tablaParcial.slice(i, i + this.dimensionPaquete);
    //   for (let j = 0; j < paquete.length; j++) {
    //   this.inventarioService.postLista(paquete[j])
    //     .subscribe(
    //       (response) => {
    //         console.log(response);
    //       },
    //       (error) => {
    //         // Manejar cualquier error en la solicitud
    //       }
    //     );
    //   }
    // }
    for (let i = 0; i < this.tablaParcial.length; i++) {
      
      this.inventarioService
        .postLista(this.tablaParcial[i])
        .pipe(
          catchError((error: HttpErrorResponse) => {
            return throwError(error);
          })
        )
        .subscribe({
          next: (data) => {
            console.log(data);
          },
          error: (error) => {
            try {
              // intentar manejar el error
              if (error.status === 500) {
                console.log(error);
              } else {
                // hacer algo para otros errores
                console.log(error);
              }
            } catch (e) {
              console.log(e);
            }
          },
        });
    }
  }
}
