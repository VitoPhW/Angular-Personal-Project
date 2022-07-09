import { ToastrService } from 'ngx-toastr';
import { AccountService } from './../services/account.service';
import { Injectable } from '@angular/core';
import { CanActivate } from '@angular/router';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate{
  /**
   * Generall check if the website resource is accessible for authenticated user.
   * @param acountService brings current authenticated user.
   * @param toastr projects the messages in appropriate cases.
   */

constructor(
  private acountService: AccountService,
  private toastr: ToastrService) { }

  canActivate() : Observable<boolean>
  {
    return this.acountService.currentUser$.pipe(
      map(user => {
        if (user)return true;

        this.toastr.error('You Shall Not Pass 🔥🧙‍♂️🔥');
        return false;
      })
    )
  }
}
