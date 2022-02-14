import { MembersService } from './../../services/members.service';
import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/models/IMember';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members$: Observable<IMember[]>;

  constructor(private memberService: MembersService) { }

  ngOnInit() {
    this.members$ = this.memberService.getMembers();
  }
}
