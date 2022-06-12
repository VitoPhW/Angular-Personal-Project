import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable, of, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICategory } from '../models/ICategory';
import { PaginatedResult } from '../models/IPagination';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  baseUrl = environment.apiUrl;
  categoriesCache: string[] = [];

  constructor(private http: HttpClient) { }

  getCategoryNames() {
    if(this.categoriesCache.length > 0) return of(this.categoriesCache);

    return this.http.get<string[]>(`${this.baseUrl}category/categorynames`)
    .pipe(tap(response => this.categoriesCache = response));
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
}
