import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Users } from '../interfaces/users';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _usuario!: Users | null;
  private _token!: string | null;

  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    if (sessionStorage.getItem('token') !== null) {
      return true;
    }
    return false;
  }
  obtenerDatosToken(accessToken: string): any {
    if (accessToken != null) {
      return JSON.parse(atob(accessToken.split('.')[1]));
    }
    return null;
  }
  guardarToken(accessToken: string): void {
    this._token = accessToken;
    sessionStorage.setItem('token', accessToken);
  }
  guardarUsuario(usuario: Users): void {
    let usuario1 = usuario;
    this._usuario = new Users(); //poner el usuario en el objeto
    this._usuario.id = usuario1.id;
    this._usuario.name = usuario1.name;
    this._usuario.email = usuario1.email;
    this._usuario.rol_id = usuario1.rol_id;
    sessionStorage.setItem('usuario', JSON.stringify(this._usuario));
  }
  hasRole(rol_id: number): boolean {
    if (rol_id === 1) {
      //si el usuario es admin
      return true;
    }
    if (rol_id === 2) {
      //si el usuario es cliente
      return true;
    }
    return false;
  }
  login(usuario: Users): Observable<any> {
    const url = `${this.baseUrl}login`;
    return this.http.post(url, usuario);
  }

  logout(): void {
    this._usuario = null;
    this._token = null;
    sessionStorage.clear();
    sessionStorage.removeItem('token');
    sessionStorage.removeItem('usuario');
  }
}
