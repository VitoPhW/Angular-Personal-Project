import { PaginatedResult } from './../models/IPagination';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { map, Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  product: IProduct[] = [];
  paginatedResult: PaginatedResult<IProduct[]> = new PaginatedResult<IProduct[]>();

  constructor(private http: HttpClient) { }

  getProducts(page?: number, itemsPerPage?: number) {
    let params = new HttpParams();
    if (page != null && itemsPerPage != null) {
      params = params.append("pageNumber", page.toString());
      params = params.append("pageSize", itemsPerPage.toString());
    }

    return this.http.get<IProduct[]>(`${this.baseUrl}products`,
      {
        observe: 'response',
        params
      }).pipe(
        map((res: HttpResponse<IProduct[]>) => {
          this.paginatedResult.result = res.body as IProduct[];
          if (res.headers.get('Pagination') !== null) {
            this.paginatedResult.pagination = JSON.parse(res.headers.get('Pagination') || '');
          }
          return this.paginatedResult;
        })
      )
  }

  getProduct(productname: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}products/${productname}`)
  }

  updateProduct(product: IProduct) {
    return this.http.put(`${this.baseUrl}products`, product).pipe(
      tap(_ => {
        const index = this.product.findIndex(x => x.productID === product.productID);
        this.product[index] = product;
      })
    );
  }

  setMainPhoto(photoId: number, productname: string): Observable<any> {
    return this.http.put(`${this.baseUrl}products/set-main-photo/${productname}/${photoId}`, {});
  }

  deletePhoto(photoId: number, productname: string) {
    return this.http.delete(`${this.baseUrl}products/delete-photo/${productname}/${photoId}`);
  }

  create(model: any) {
    return this.http.post<IProduct>(this.baseUrl + 'products/create', model);
  }
}
