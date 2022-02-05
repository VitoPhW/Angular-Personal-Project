import { MembersService } from './../../services/members.service';
import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/models/IMember';

@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: IMember[] = []

  constructor(private memberService: MembersService) { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers()
    .subscribe(members => {
      this.members = members;
    })
  }

}
