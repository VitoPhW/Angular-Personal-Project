import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'The APP1';
  users: any;

  /**
   *
   */
  constructor(private http: HttpClient) {
      
  }

  ngOnInit(): void {
      this.getUsers();
  }
  getUsers() {
    this.http.get('https://localhost:5001/api/users').subscribe(
      response => {this.users = response;},
      err => {console.log(err);},
      () => {console.log('Users loaded');});

    //   {
    //   next: (data) => {
    //     this.users = data;
    //   },
    //   error: (err) => {
    //     console.log(err);
    //   },
    //   complete: () => {
    //     console.log('complete');
    //   }
    // }
    // );
  }
}
