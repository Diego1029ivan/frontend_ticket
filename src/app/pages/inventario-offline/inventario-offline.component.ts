import { Component } from '@angular/core';
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
}
