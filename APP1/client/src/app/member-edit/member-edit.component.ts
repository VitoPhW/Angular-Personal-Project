import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { take } from 'rxjs';
import { IMember } from '../models/IMember';
import { IUser } from '../models/IUser';
import { AccountService } from '../services/account.service';
import { MembersService } from '../services/members.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: IMember;
  user!: IUser;

  constructor(private memberService: MembersService,
    private route: ActivatedRoute,
    private accountService: AccountService) {

      this.accountService.currentUser$.pipe(take(1)).subscribe( user => this.user = user as IUser );
     }

  ngOnInit() { this.loadMember(); }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => { this.member = member; });
  }
}
