import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-inventario-offline',
  templateUrl: './inventario-offline.component.html',
  styleUrls: ['./inventario-offline.component.css']
})
export class InventarioOfflineComponent {

  page:number=1
  pageSize:number=10
  collectionSize:number=10
  tableData:any=[];
  tablaParcial:any=[];

  tablaParcial2:any=[];
  codigoPatrimoniales:any=[]
  fechaPatrimoniales:any=[]
  codigoImpre:any=[]
  tablaReducida:any= [];
  constructor(private inventarioService: InventarioService,private http: HttpClient) {}

  onFileChange(event: any) {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: 'array' });
      const worksheet = workbook.Sheets[workbook.SheetNames[0]];
      const tableData = XLSX.utils.sheet_to_json(worksheet, { header: 1 });
      this.tableData=tableData;
      this.tablaParcial=this.refreshInventario();
      
      this.tablaParcial2=this.refreshInventarioReducido();
      console.log(this.tablaParcial2,'tabla2')
      this.collectionSize=tableData.length;
     
      for (let i = 0; i < tableData.length; i++) {
        this.codigoPatrimoniales.push(this.tableData[i][1]);
        this.fechaPatrimoniales.push(this.tableData[i][6])
        
      }
      this.codigoImpre=this.codigoPatrimoniales;
      console.log(this.codigoImpre)
      console.log(this.fechaPatrimoniales)
      
      
      for (let i = 1; i < this.tableData.length; i++) {
        this.tablaReducida.push({codigo: this.tableData[i][1], 
                                 fecha: this.tableData[i][6],
                                 nombre: this.tableData[i][2],
                                 estado: this.tableData[i][9]});
      }
      console.log( this.tablaReducida)
    };
    reader.readAsArrayBuffer(file);
    
  }

  public refreshInventario() {
		this.tablaParcial = this.tableData.slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize+1,
		);
    return this.tablaParcial
	}

  public refreshInventarioReducido() {
		this.tablaParcial2 = this.tablaReducida.slice(
			(this.page - 1) * this.pageSize,
			(this.page - 1) * this.pageSize + this.pageSize+1,
		);
    return this.tablaParcial2
	}


  // imprimirPDF(codigo:string){
  //   console.log(codigo)
  //   this.inventarioService.getticketPDF(codigo).subscribe((response)=>{
  //     console.log(response)
  //     window.open(response['url'], '_blank');
  //   });
    
  // }
}
