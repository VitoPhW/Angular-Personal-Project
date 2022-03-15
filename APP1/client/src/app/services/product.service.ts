import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment';
import { Injectable } from '@angular/core';
import { IProduct } from '../models/IProduct';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ProductService {

  baseUrl = environment.apiUrl;
  product: IProduct [] = [];

  constructor(private http: HttpClient) { }

  getProducts(): Observable<IProduct[]> {
    return this.http.get<IProduct[]>(`${this.baseUrl}products`)
  }

  getProduct(productname: string): Observable<IProduct> {
    return this.http.get<IProduct>(`${this.baseUrl}products/${productname}`)
  }

  updateProduct(product: IProduct) {
    return this.http.put(`${this.baseUrl}products`, product).pipe(
      tap(_ => {
        const index = this.product.findIndex( x => x.productID === product.productID);
        this.product[index] = product;
      })
    );
  }

  setMainPhoto(photoId: number, productname: string) : Observable<any>{
    return this.http.put(`${this.baseUrl}products/set-main-photo/${productname}/${photoId}`,{});
  }

  deletePhoto(photoId: number, productname: string){
    return this.http.delete(`${this.baseUrl}products/delete-photo/${productname}/${photoId}`);
  }
}
