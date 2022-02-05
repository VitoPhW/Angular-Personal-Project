import { environment } from './../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { IUser } from '../models/IUser';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource$ = new ReplaySubject<IUser | null>(1);
  currentUser$ = this.currentUserSource$.asObservable();

  constructor(private http: HttpClient) { }

  setCurrentUser(user: IUser) {
    this.currentUserSource$.next(user);
  }

  login(model: any){
    return this.http.post<IUser>(this.baseUrl + 'account/login', model)
    .pipe(
      map((response: IUser) => {
        const user = response;
        if(user) {
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource$.next(user);
        }
      })
    );
  }

  logout(){
    localStorage.removeItem('user');
    this.currentUserSource$.next(null);
  }

  regiser(model: any){
    return this.http.post<IUser>(this.baseUrl + 'accunt/register', model)
    .pipe(
      map((user: IUser) => {
        if(user){
          localStorage.setItem('user', JSON.stringify(user));
          this.currentUserSource$.next(user);
        }
        return user;
      })
    )
  }
}
