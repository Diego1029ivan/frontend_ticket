import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
@Injectable({
  providedIn: 'root',
})
export class UserService {
  private baseUrl: string = environment.baseUrl;
  constructor(private http: HttpClient) {}
  getAllUsers() {
    const url = `${this.baseUrl}usersAll`;
    return this.http.get(url);
  }
}
