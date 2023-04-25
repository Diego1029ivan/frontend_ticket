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

  public get usuario(): Users {
    if (this._usuario !== null) {
      return this._usuario;
    } else if (sessionStorage.getItem('usuario') !== null) {
      let usuario = sessionStorage.getItem('usuario') as string;
      try {
        this._usuario = JSON.parse(usuario) as Users;
        return this._usuario;
      } catch (error) {
        console.error(
          'Error al convertir el usuario desde sessionStorage',
          error
        );
      }
    }
    return new Users();
  }
  public get token(): any {
    if (this._token !== null) {
      return this._token;
    } else if (sessionStorage.getItem('token') !== null) {
      this._token = sessionStorage.getItem('token') as string;
      return this._token;
    }

    return null;
  }

  isAuthenticated(): boolean {
    return this.token !== null;
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
