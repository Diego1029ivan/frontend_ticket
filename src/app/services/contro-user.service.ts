import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class ControUserService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  //Rol
  getAllRol(): Observable<any> {
    const url = `${this.baseUrl}/rol`;
    return this.http.get<any>(url);
  }
  addRol(rol: any): Observable<any> {
    const url = `${this.baseUrl}/rol`;
    return this.http.post(url, rol);
  }
  updateRol(rol: any): Observable<any> {
    const url = `${this.baseUrl}/rol/${rol.idrol}`;
    return this.http.put<any>(url, rol);
  }
  deleteRol(id: number): Observable<any> {
    const url = `${this.baseUrl}/rol/${id}`;
    return this.http.delete<any>(url);
  }
  //Modulo
  getAllModulo(): Observable<any> {
    const url = `${this.baseUrl}/module`;
    return this.http.get<any>(url);
  }
  addModulo(modulo: any): Observable<any> {
    const url = `${this.baseUrl}/module`;
    return this.http.post<any>(url, modulo);
  }
  updateModulo(modulo: any): Observable<any> {
    const url = `${this.baseUrl}/module/${modulo.idmodulo}`;
    return this.http.put<any>(url, modulo);
  }
  deleteModulo(id: number): Observable<any> {
    const url = `${this.baseUrl}/module/${id}`;
    return this.http.delete<any>(url);
  }
  //Submodulo
  getAllSubmodulo(): Observable<any> {
    const url = `${this.baseUrl}/submodule`;
    return this.http.get(url);
  }
  addSubmodulo(submodulo: any): Observable<any> {
    const url = `${this.baseUrl}/submodule`;
    return this.http.post<any>(url, submodulo);
  }
  updateSubmodulo(submodulo: any): Observable<any> {
    const url = `${this.baseUrl}/submodule/${submodulo.idsubmodulo}`;
    return this.http.put<any>(url, submodulo);
  }
  deleteSubmodulo(id: number): Observable<any> {
    const url = `${this.baseUrl}/submodule/${id}`;
    return this.http.delete<any>(url);
  }
  //Permiso
  getAllPermisos(): Observable<any> {
    const url = `${this.baseUrl}/rolpermiso`;
    return this.http.get<any>(url);
  }
  addPermiso(permiso: any) {
    const url = `${this.baseUrl}/rolpermiso`;
    return this.http.post<any>(url, permiso);
  }
  updatePermiso(permiso: any): Observable<any> {
    const url = `${this.baseUrl}/rolpermiso/${permiso.idpermiso}`;
    return this.http.put<any>(url, permiso);
  }
  deletePermiso(id: number): Observable<any> {
    const url = `${this.baseUrl}/rolpermiso/${id}`;
    return this.http.delete<any>(url);
  }
}
