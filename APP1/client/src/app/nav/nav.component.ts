import { ToastrService } from 'ngx-toastr';
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
  // loggedIn: boolean = false;
  currentUser$: Observable<IUser | null>;
  isAdmin: boolean = false;

  constructor
    (private accountService: AccountService,
     private router: Router,
     private toastr: ToastrService)
    {
      this.currentUser$ = this.accountService.currentUser$;

    }

  ngOnInit(): void { }

  login(){
    this.accountService.login(this.model)
    .subscribe(
      response => {
      this.router.navigateByUrl('/products');
      console.log(response);
    });
  }

  logout(){
    this.router.navigateByUrl('/');
    this.accountService.logout();
  }

}
