import { Injectable, PipeTransform } from '@angular/core';
import { environment } from 'src/environments/environment';

import { debounceTime, delay, switchMap, tap } from 'rxjs/operators';

import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';
import { Inventario } from '../interfaces/inventario';


@Injectable({
  providedIn: 'root',
})
export class InventarioService {

  constructor(
      private http: HttpClient
  )
  {}


  private baseUrl: string = environment.baseUrl + '/backend_ticket/';

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
