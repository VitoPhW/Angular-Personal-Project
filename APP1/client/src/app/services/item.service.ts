import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { IItem } from '../models/IItem';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ItemService {

  baseUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  getItems(): Observable<IItem[]> {
    return this.http.get<IItem[]>(`${this.baseUrl}products`)
  }

  getItem(productname: string): Observable<IItem> {
    return this.http.get<IItem>(`${this.baseUrl}products/${productname}`)
  }
}
