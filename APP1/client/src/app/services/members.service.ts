import { IShoppingCart } from './../models/IShoppingCart';
import { LikedProductsParams } from './../models/likedProductsParams';
import { IProduct } from 'src/app/models/IProduct';
import { MemberParams } from './../models/memberParams';
import { environment } from './../../environments/environment';
import { HttpClient, HttpParams, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IMember } from '../models/IMember';
import { map, Observable, of, ReplaySubject, tap } from 'rxjs';
import { PaginatedResult } from '../models/IPagination';
import { ShoppingCartParams } from '../models/shoppingCartParams';


@Injectable({
  providedIn: 'root'
})
export class MembersService {

  baseUrl = environment.apiUrl;
  // members: IMember[] = [];
  paginatedResult: PaginatedResult<IMember[]> = new PaginatedResult<IMember[]>();
  memberCache = new Map<string, PaginatedResult<IMember[]>>();
  memberParams: MemberParams;
  shoppingCartParams: ShoppingCartParams;
  likedProductsParams: LikedProductsParams;
  private shoppingCartCountSource$ = new ReplaySubject<number>();
  shoppingCartCount$ = this.shoppingCartCountSource$.asObservable();

  constructor(private http: HttpClient) {
    this.likedProductsParams = new LikedProductsParams();
  }

  public get MemberParams(): MemberParams {
    return this.memberParams;
  }
  public set MemberParams(memberParams: MemberParams) {
    this.memberParams = memberParams;
  }

  public get ShoppingCartParams(): ShoppingCartParams {
    return this.shoppingCartParams;
  }
  public set ShoppingCartParams(shoppingCartParams: ShoppingCartParams) {
    this.shoppingCartParams = shoppingCartParams;
  }

  resetMemberParams() {
    this.memberParams = new MemberParams();
    return this.memberParams;
  }

  getMembers(memberParams: MemberParams) {
    const cacheKey = Object.values(memberParams).join('-');
    const response = this.memberCache.get(cacheKey);
    if (response) return of(response);

    let params = this.getPaginationParams(memberParams.pageNumber, memberParams.pageSize);

    return this.getPaginatedResult<IMember[]>(`${this.baseUrl}users`, params)
      .pipe(tap(response => this.memberCache.set(cacheKey, response)));
  }

  getLikes(username: string, pageNumber: number, pageSize: number) {
    let params = this.getPaginationParams(pageNumber, pageSize)
    params = params.append('username', username);

    return this.getPaginatedResult<Partial<IProduct[]>>(`${this.baseUrl}likes`, params);
  }

  private getPaginatedResult<T>(url: string, params: HttpParams): Observable<PaginatedResult<T>> {
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

  private getPaginationParams(pageNumber: number, pageSize: number) {
    let params = new HttpParams();
    params = params.append('pageNumber', pageNumber.toString());
    params = params.append('pageSize', pageSize.toString());
    return params;
  }

  getMember(membername: string): Observable<IMember> {
    // spread the array
    const members = [...this.memberCache.values()];
    // get the results from each array
    const allMembers = members.reduce((arr: IMember[], element: PaginatedResult<IMember[]>) => arr.concat(element.result), []);
    // find in the result an appropriate member
    const foundMember = allMembers.find(m => m.userName === membername);
    // return the member if it found
    if (foundMember) return of(foundMember);

    // get and return the member from db
    return this.http.get<IMember>(`${this.baseUrl}users/${membername}`);
  }

  updateMember(member: IMember) {
    return this.http.put(`${this.baseUrl}users`, member);
    // .pipe(
    //   tap(_ => {
    //     const index = this.members.findIndex(x => x.id === member.id);
    //     this.members[index] = member;
    //   })
    // );
  }

  addToShoppingCart(productId: number): Observable<number> {
    return this.http.post<number>(`${this.baseUrl}ShoppingCart/addtocart/${productId}`, {})
      .pipe(map(_ => {
        this.getShoppingCartCount();
        return _;
      }));
  }

  getShoppingCart(shoppingCartParams: ShoppingCartParams) {
    let params = this.getPaginationParams(shoppingCartParams.pageNumber, shoppingCartParams.pageSize);

    return this.getPaginatedResult<IShoppingCart[]>(`${this.baseUrl}ShoppingCart`, params)
      .pipe(map(_ => {
        this.getShoppingCartCount();
        return _;
      }));
  }

  setCartItem(productId: number, quantity: number): Observable<number> {
    return this.http.put<number>(`${this.baseUrl}ShoppingCart/setcartitem/${productId}/${quantity}`, {});
  }

  getShoppingCartCount() {
    console.log("getShoppingCartCount:");

    this.http.get<number>(`${this.baseUrl}ShoppingCart/countitems`)
      .subscribe(count => {
        this.shoppingCartCountSource$.next(count);
        console.log(count);
      });
  }

  checkout() {
    return this.http.put(`${this.baseUrl}ShoppingCart/checkout`, {});
  }
}
