import { IPagination } from './../../models/IPagination';
import { MembersService } from './../../services/members.service';
import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/models/IMember';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: IMember[];
  pagination: IPagination;
  pageNumber: number = 1;
  pageSize: number = 6;

  constructor(private memberService: MembersService) { }

  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.memberService.getMembers(this.pageNumber, this.pageSize).subscribe(
      res => {
        this.members = res.result;
        this.pagination = res.pagination;
      }
    )
  }

  pageChanged({page}: any){
    this.pageNumber = page;
    this.loadMembers();
  }
}
