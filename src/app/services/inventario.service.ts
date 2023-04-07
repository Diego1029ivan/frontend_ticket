import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../interfaces/inventario';
@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private baseUrl: string = environment.baseUrl + '/backend_ticket/';
  constructor(private http: HttpClient) {}
  getInventario(): Observable<Inventario[]> {
    return this.http.get<Inventario[]>(`${this.baseUrl}inventario`);
  }
  getInventarioById(id: number): Observable<Inventario> {
    return this.http.get<Inventario>(`${this.baseUrl}inventario/${id}`);
  }
  getinventarioBarra(barra: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}inventarioBarra/${barra}`);
  }
  getinventarioBarraExcel(barra: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}inventarioBarraExcel/${barra}`);
  }

  getticketPDF(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}ticketPDFExcel/${codigo}`);
  }
}
