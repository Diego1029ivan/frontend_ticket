import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { InventarioService } from 'src/app/services/inventario.service';
import { environment } from 'src/environments/environment';
import * as XLSX from 'xlsx';

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
  data: any[] = [];

  tablaParcial: any = [];

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
      // console.log(this.data.length);
      // console.log(this.header);
      this.collectionSize = this.data.length;

      this.tablaParcial = this.data;
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
}
