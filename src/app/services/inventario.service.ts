import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { map, catchError } from 'rxjs/operators';

import {
  HttpClient,
  HttpRequest,
  HttpEvent,
  HttpHeaders,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { Inventario } from '../interfaces/inventario';
@Injectable({
  providedIn: 'root',
})
export class InventarioService {
  private baseUrl: string = environment.baseUrl;
  private apiUrl = 'http://tu-api.com/generar-pdf';

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
}
