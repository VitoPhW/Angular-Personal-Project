import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMember } from '../models/IMember';
import { Observable, of, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: IMember [] = [];

  constructor(private http: HttpClient) { }

  getMembers(): Observable<IMember[]>{
    if(this.members.length)
    {
      return of(this.members);
    }

    return this.http.get<IMember[]>(`${this.baseUrl}users`).pipe(
      tap(members => this.members = members)
    )
  }

  getMember(username: string): Observable<IMember>{
    const member = this.members.find(x => x.userName == username);
    if(member){
      return of(member);
    }
    return this.http.get<IMember>(`${this.baseUrl}users/${username}`)
  }

  updateMember(member: IMember) {
    return this.http.put(`${this.baseUrl}users`, member).pipe(
      tap(_ => {
        const index = this.members.findIndex( x => x.id === member.id);
        this.members[index] = member;
      })
    );
  }
}
