import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../interfaces/inventario';
import { Bien } from '../interfaces/bien';
import { ItemsSelect } from '../interfaces/itemsSelect';
@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private baseUrl: string = environment.baseUrl + '/backend_ticket/';
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://example.com/api/downloadpdf';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Accept': 'application/pdf'
    }),
    responseType: 'blob' as 'json'
  };

  
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

  getBienes():Observable<Bien>{
    return this.http.get<Bien>(`${this.baseUrl}/bien`);
  }
  getCodigo(codigo:string):Observable<any>{
    return this.http.get<any>(`${this.baseUrl}/biencodigo/${codigo}`);
  }
  postLista(data:Bien):Observable<any>{
    return this.http.post<Bien>(`${this.baseUrl}agregar`,data);
  }

  //cargar un nuevo pdf con post
  postpaqueteCodigo(codigo:ItemsSelect):Observable<Blob>{
    return this.http.post<Blob>(`${this.baseUrl}imprimir`,codigo,this.httpOptions);
  }
}
