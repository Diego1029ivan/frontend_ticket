import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Bien } from '../interfaces/bien';
import { ItemsSelect } from '../interfaces/itemsSelect';
@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private baseUrl: string = environment.baseUrl + '/backend_ticket/';
  private baseUrl1: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  private apiUrl = 'http://example.com/api/downloadpdf';
  private httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/pdf',
    }),
    responseType: 'blob' as 'json',
  };

  getticketPDF(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}ticketPDFExcel/${codigo}`);
  }

  getBienes(): Observable<Bien> {
    return this.http.get<Bien>(`${this.baseUrl1}/inventaryAll`);
  }
  getCodigo(codigo: string): Observable<any> {
    return this.http.get<any>(`${this.baseUrl}/biencodigo/${codigo}`);
  }
  postLista(data: Bien): Observable<any> {
    return this.http.post<Bien>(`${this.baseUrl1}/inventary`, data);
  }

  //cargar un nuevo pdf con post
  postpaqueteCodigo(codigo: ItemsSelect): Observable<Blob> {
    return this.http.post<Blob>(
      `${this.baseUrl1}/imprimir`,
      codigo,
      this.httpOptions
    );
  }
}
