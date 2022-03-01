import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { IItem } from '../models/IItem';
import { Observable, tap } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl = environment.apiUrl;
  items: IItem [] = [];

  constructor(private http: HttpClient) { }

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${this.baseUrl}products`)
  }

  getItem(productname: string): Observable<IItem> {
    return this.http.get<IItem>(`${this.baseUrl}products/${productname}`)
  }

  updateItem(item: IItem) {
    return this.http.put(`${this.baseUrl}products`, item).pipe(
      tap(_ => {
        const index = this.items.findIndex( x => x.productID === item.productID);
        this.items[index] = item;
      })
    );
  }
}
