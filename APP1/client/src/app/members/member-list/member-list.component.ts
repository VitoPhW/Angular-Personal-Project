import { IProduct } from './../../models/IProduct';
import { AccountService } from './../../services/account.service';
import { MemberParams } from './../../models/memberParams';
import { IPagination } from './../../models/IPagination';
import { MembersService } from './../../services/members.service';
import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/models/IMember';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-member-list',
  templateUrl: './member-list.component.html',
  styleUrls: ['./member-list.component.css']
})
export class MemberListComponent implements OnInit {

  members: IMember[];
  pagination: IPagination;
  memberParams: MemberParams;

  constructor(private membersService: MembersService, accountService: AccountService) {
    this.memberParams = new MemberParams();
  }
  ngOnInit() {
    this.loadMembers();
  }

  loadMembers() {
    this.membersService.MemberParams = this.memberParams;
    this.membersService.getMembers(this.memberParams).subscribe(
      res => {
        this.members = res.result;
        this.pagination = res.pagination;
      }
    )
  }

  pageChanged({page}: any){
    this.memberParams.pageNumber = page;
    this.membersService.MemberParams = this.memberParams;
    this.loadMembers();
  }
}
