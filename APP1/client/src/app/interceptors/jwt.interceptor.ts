import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, take } from 'rxjs';
import { IUser } from '../models/IUser';

@Injectable()
export class JwtInterceptor implements HttpInterceptor {

  constructor(private account: AccountService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    let currentUser: IUser = {token:'', username:'', roles:[]};

    this.account.currentUser$.pipe(take(1)).subscribe((user: IUser | null) => { if(user) currentUser = user });
    if (currentUser.token) {
      request = request.clone({
        setHeaders: {
          Authorization: `Bearer ${currentUser.token}`
        }
      })
    }
    return next.handle(request);
  }
}
