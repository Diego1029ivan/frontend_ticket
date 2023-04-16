import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';
import * as moment from 'moment';
import { Bien } from 'src/app/interfaces/bien';

@Component({
  selector: 'app-inventario-offline',
  templateUrl: './inventario-offline.component.html',
  styleUrls: ['./inventario-offline.component.css'],
})


export class InventarioOfflineComponent {
  public urlCodigoBarra: string = environment.baseUrl;
  page: number = 1;
  pageSize: number = 10;
  collectionSize: number = 0;
  data: Bien[] = [];

  tablaParcial: any = [];
  busqueda:string = '';
  file: File | null = null;
  header: string[] = [];
  constructor(
    private inventarioService: InventarioService,
    private http: HttpClient
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
      console.log(this.data)
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

  /*========Buscar============*/
  actualizarBusqueda(event:KeyboardEvent) {
    this.busqueda = (event.target as HTMLInputElement).value;
    console.log(this.busqueda)
  }

  /*====== POST ========*/
  enviarBienes():void{
    
    for (let i = 0; i < this.data.length; i++) {
      console.log(this.data[i])

      this.data[i]['FECHA_DOCUMENTO_ADQUIS']=moment(this.data[i]['FECHA_DOCUMENTO_ADQUIS'],'DD/MM/YYYY').format('YYYY-MM-DD');
      console.log(this.data[i]['FECHA_DOCUMENTO_ADQUIS']) 
      
      this.data[i]['NOM_EST_BIEN']=this.data[i]['NOM_EST_BIEN'].charAt(0);
      console.log(this.data[i]['NOM_EST_BIEN'])
      this.data[i]['CONDICION']=this.data[i]['CONDICION'].charAt(0);
      console.log(this.data[i]['CONDICION'])

      this.inventarioService.getCodigo(this.data[i]['CODIGO_PATRIMONIAL']).subscribe((check)=>{
        console.log("ya existe")
      },
      (error)=>{
        this.inventarioService.postLista(this.data[i]).subscribe(() => {
          console.log('Objeto creado exitosamente');
        },
        (error) => {
          console.error('Error al crear objeto', error);
        }
        );
      })

        
      
    }
     

   
    
  }

  

  
}
