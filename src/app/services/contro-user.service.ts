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
  getAllRol() {
    const url = `${this.baseUrl}/rol`;
    return this.http.get(url);
  }
  addRol(rol: any) {
    const url = `${this.baseUrl}/rol`;
    return this.http.post(url, rol);
  }
  updateRol(rol: any) {
    const url = `${this.baseUrl}/rol/${rol.idrol}`;
    return this.http.put(url, rol);
  }
  deleteRol(id: number) {
    const url = `${this.baseUrl}/rol/${id}`;
    return this.http.delete(url);
  }
  //Modulo
  getAllModulo() {
    const url = `${this.baseUrl}/module`;
    return this.http.get(url);
  }
  addModulo(modulo: any) {
    const url = `${this.baseUrl}/module`;
    return this.http.post(url, modulo);
  }
  updateModulo(modulo: any) {
    const url = `${this.baseUrl}/module/${modulo.idmodulo}`;
    return this.http.put(url, modulo);
  }
  deleteModulo(id: number) {
    const url = `${this.baseUrl}/module/${id}`;
    return this.http.delete(url);
  }
  //Submodulo
  getAllSubmodulo() {
    const url = `${this.baseUrl}/submodule`;
    return this.http.get(url);
  }
  addSubmodulo(submodulo: any) {
    const url = `${this.baseUrl}/submodule`;
    return this.http.post(url, submodulo);
  }
  updateSubmodulo(submodulo: any) {
    const url = `${this.baseUrl}/submodule/${submodulo.idsubmodulo}`;
    return this.http.put(url, submodulo);
  }
  deleteSubmodulo(id: number) {
    const url = `${this.baseUrl}/submodule/${id}`;
    return this.http.delete(url);
  }
  //Permiso
  getAllPermisos() {
    const url = `${this.baseUrl}/rolpermiso`;
    return this.http.get(url);
  }
  addPermiso(permiso: any) {
    const url = `${this.baseUrl}/rolpermiso`;
    return this.http.post(url, permiso);
  }
  updatePermiso(permiso: any) {
    const url = `${this.baseUrl}/rolpermiso/${permiso.idpermiso}`;
    return this.http.put(url, permiso);
  }
  deletePermiso(id: number) {
    const url = `${this.baseUrl}/rolpermiso/${id}`;
    return this.http.delete(url);
  }
}
