import { MembersService } from 'src/app/services/members.service';
import { AccountService } from './../services/account.service';
import { Component, OnInit } from '@angular/core';
import { IUser } from '../models/IUser';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  currentUser$: Observable<IUser | null>;
  shoppingCartCount$: Observable<number>;

  constructor
    (private accountService: AccountService,
      private membersService: MembersService,
      private router: Router) {
    this.currentUser$ = this.accountService.currentUser$;
    this.shoppingCartCount$ = this.membersService.shoppingCartCount$;
  }

  ngOnInit(): void { }

  login() {
    this.accountService.login(this.model)
      .subscribe(response => {
        this.router.navigateByUrl('/products');
        this.membersService.getShoppingCartCount();
      });
  }

  logout() {
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }

}
