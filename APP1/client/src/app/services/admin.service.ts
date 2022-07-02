import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getUsersWithRoles() {
    return this.http.get<Partial<IUser[]>>(this.baseUrl + "admin/users-with-roles");
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.http.post(`${this.baseUrl}admin/edit-roles/${username}?roles=${roles}`, {});
  }
}
