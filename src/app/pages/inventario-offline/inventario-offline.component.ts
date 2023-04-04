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
  pageSize:number=4
  collectionSize:number=10
  tableData:any=[];
  tablaParcial:any=[];
  codigoPatrimoniales:any=[]
  fechaPatrimoniales:any=[]
  codigoImpre:any=[]
  
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
      this.collectionSize=tableData.length;
      console.log(tableData);
      for (let i = 0; i < tableData.length; i++) {
        this.codigoPatrimoniales.push(this.tableData[i][1]);
        this.fechaPatrimoniales.push(this.tableData[i][6])
        
      }
      this.codigoImpre=this.codigoPatrimoniales;
      console.log(this.codigoImpre)
      console.log(this.fechaPatrimoniales)
      
      
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

  // imprimirPDF(codigo:string){
  //   console.log(codigo)
  //   this.inventarioService.getticketPDF(codigo).subscribe((response)=>{
  //     console.log(response)
  //     window.open(response['url'], '_blank');
  //   });
    
  // }
}
