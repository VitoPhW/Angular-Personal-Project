import { MemberParams } from './../models/memberParams';
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
  memberCache = new Map<string, PaginatedResult<IMember[]>>();
  memberParams: MemberParams;

  constructor(private http: HttpClient) { }

  public get MemberParams() : MemberParams {
    return this.memberParams;
  }

  public set MemberParams(memberParams: MemberParams) {
    this.memberParams = memberParams;
  }

  resetMemberParams() {
    this.memberParams = new MemberParams();
    return this.memberParams;
  }

  getMembers(memberParams: MemberParams) {
    const cacheKey = Object.values(memberParams).join('-');
    const response = this.memberCache.get(cacheKey);
    if(response) return of(response);

    let params = this.getPaginationParams(memberParams);

    return this.getPaginatedResult<IMember[]>(`${this.baseUrl}users`, params)
    .pipe(tap(response => this.memberCache.set(cacheKey, response)));
  }

  private getPaginatedResult<T>(url: string, params: HttpParams):Observable<PaginatedResult<T>> {
    const paginatedResult: PaginatedResult<T> = new PaginatedResult<T>();

    return this.http.get<T>(url,
      {
        observe: 'response',
        params
      }).pipe(
        map((res: HttpResponse<T>) => {
          paginatedResult.result = res.body as T;
          if (res.headers.get('Pagination') !== null) {
            paginatedResult.pagination = JSON.parse(res.headers.get('Pagination') || '');
          }
          return paginatedResult;
        })
      );
  }

  private getPaginationParams({pageNumber, pageSize}: MemberParams){
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }

  getMember(membername: string): Observable<IMember>{
    // spread the array
    const members = [...this.memberCache.values()];
    // get the results from each array
    const allMembers = members.reduce((arr: IMember[], element: PaginatedResult<IMember[]>) => arr.concat(element.result), []);
    // find in the result an appropriate member
    const foundMember = allMembers.find(m => m.userName === membername);
    // return the member if it found
    if(foundMember) return of(foundMember);

    // get and return the member from db
    return this.http.get<IMember>(`${this.baseUrl}users/${membername}`)
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
