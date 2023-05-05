import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Users } from '../interfaces/users';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  usuario: Users = new Users();
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllUsers() {
    const url = `${this.baseUrl}/usersAll`;
    return this.http.get(url);
  }
  getUser(id: number) {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.get(url);
  }
  addUser(user: any) {
    const url = `${this.baseUrl}/registerUser/${user.rol_id}`;
    return this.http.post(url, user);
  }
  updateUser(user: Users) {
    const url = `${this.baseUrl}/users/${user.id}`;
    return this.http.put(url, user);
  }
  updatePerfil(user: any): Observable<any> {
    return this.http.post<any>(`${this.baseUrl}/updateProfile`, user);
  }
  deleteUser(id: number) {
    const url = `${this.baseUrl}/users/${id}`;
    return this.http.delete(url);
  }
}
