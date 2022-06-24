import { AccountService } from './account.service';
import { ProductParams } from './../models/productParams';
import { PaginatedResult } from './../models/IPagination';
import { HttpClient, HttpHeaders, HttpParams, HttpResponse } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { map, Observable, of, take, tap } from 'rxjs';
import { IUser } from '../models/IUser';
import { IMember } from '../models/IMember';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  product: IProduct[] = [];
  productCache = new Map<string, PaginatedResult<IProduct[]>>();
  productParams: ProductParams;

  // in case filter based on user parameters is reqiered
  // user: IUser;

  constructor(private http: HttpClient, accountService: AccountService) {
    /* // in case filter based on user parameters is reqiered:
    accountService.currentUser$ // runs in sync mode, because of currentUser$ is created localy, but not on server.
    .pipe(take(1)).subscribe((user: any) => {this.user = user;}); */

    this.productParams = new ProductParams();
  }

  public get ProductParams() : ProductParams {
    return this.productParams;
  }

  public set ProductParams(productParams: ProductParams) {
    this.productParams = productParams;
  }

  resetProductParams() {
    this.productParams = new ProductParams();
    return this.productParams;
  }

  getProducts(productParams: ProductParams) {

    const cacheKey = Object.values(productParams).join('-');
    const response = this.productCache.get(cacheKey);
    if(response) return of(response);

    let params = this.getPaginationParams(productParams);
    params = params.append('minPrice', productParams.minPrice.toString());
    params = params.append('maxPrice', productParams.maxPrice.toString());
    params = params.append('category', productParams.category);
    params = params.append('orderBy', productParams.orderBy);

    return this.getPaginatedResult<IProduct[]>(`${this.baseUrl}products`, params)
    .pipe(tap(response => this.productCache.set(cacheKey, response)));
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
    // spread the array
    const products = [...this.productCache.values()];
    // get the results from each array
    const allProducts = products.reduce((arr: IProduct[], element: PaginatedResult<IProduct[]>) => arr.concat(element.result), []);
    // find in the result an appropriate product
    const foundProduct = allProducts.find(m => m.productname === productname);
    // return the product if it found
    if(foundProduct) return of(foundProduct);

    // get and return the product from db
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

  getLikes(productname: string){
    return this.http.get<Partial<IMember>[]>(`${this.baseUrl}likes/${productname}`);
  }

  addLike(productname: string) {
    return this.http.put(`${this.baseUrl}likes/addlike/${productname}`,{});
  }

  removeLike(productname: string) {
    return this.http.put(`${this.baseUrl}likes/removelike/${productname}`,{});
  }
}
