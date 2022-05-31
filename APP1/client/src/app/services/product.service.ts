import { ProductParams } from './../models/productParams';
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

  constructor(private http: HttpClient) { }

  getProducts(productParams: ProductParams) {
    let params = this.getPaginationParams(productParams);
    params = params.append('minPrice', productParams.minPrice.toString());
    params = params.append('maxPrice', productParams.maxPrice.toString());
    params = params.append('category', productParams.category.toString());

    return this.getPaginatedResult<IProduct[]>(`${this.baseUrl}products`, params);
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

  private getPaginationParams({pageNumber, pageSize}: ProductParams){
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }
}
