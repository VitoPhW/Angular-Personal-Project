import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMember } from '../models/IMember';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getMembers(): Observable<IMember[]>{
    return this.http.get<IMember[]>(`${this.baseUrl}users`)
  }

  getMember(username: string): Observable<IMember>{
    return this.http.get<IMember>(`${this.baseUrl}users/${username}`)
  }

  updateMember(member: IMember) {
    return this.http.put(`${this.baseUrl}users`, member);
  }
}
