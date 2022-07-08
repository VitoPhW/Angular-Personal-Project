import { AccountService } from './../services/account.service';
import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { IUser } from '../models/IUser';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  registerMode = false;
  users: any;
  currentUser$: Observable<IUser | null>;

  constructor(
    private http: HttpClient,
    private accountService: AccountService
    ) { }

  ngOnInit(): void {
    this.currentUser$ = this.accountService.currentUser$;
   }

  registerToggle() {
    this.registerMode = !this.registerMode;
  }

  getUsers(){
    this.http.get('https://localhost:5001/api/users')
    .subscribe(
      users => this.users = users,
      error => console.log(error))
  }

  cancelRegisterMode($event: boolean){
    this.registerMode = $event;
  }
}
