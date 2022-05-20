import { environment } from './../../environments/environment';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMember } from '../models/IMember';
import { map, Observable, of, tap } from 'rxjs';
import { PaginatedResult } from '../models/IPagination';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  members: IMember [] = [];
  paginatedResult: PaginatedResult<IMember[]> = new PaginatedResult<IMember[]>();


  constructor(private http: HttpClient) { }

  getMembers(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page.toString());
      params = params.append("pageSize", itemsPerPage.toString());
    }

    return this.http.get<IMember[]>(`${this.baseUrl}users`,
      {
        observe: 'response',
        params
      }).pipe(
        map((res: HttpResponse<IMember[]>) => {
          this.paginatedResult.result = res.body as IMember[];
          if (res.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(res.headers.get('Pagination') || '');
          }
          return this.paginatedResult;
        })
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
