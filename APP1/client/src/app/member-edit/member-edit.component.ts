import { ToastrService } from 'ngx-toastr';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { take } from 'rxjs';
import { IMember } from '../models/IMember';
import { IUser } from '../models/IUser';
import { AccountService } from '../services/account.service';
import { MembersService } from '../services/members.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {

  member: IMember;
  user!: IUser;
  @ViewChild('editForm') editForm: NgForm

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(
              private memberService: MembersService,
              private accountService: AccountService,
              private toastr: ToastrService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(
      user => { this.user = user as IUser; }
      );
  }

  ngOnInit() { this.loadMember(); }

  loadMember() {
    this.memberService.getMember(this.user.username).subscribe(member => { this.member = member; });
  }

  updateMember() {
    this.memberService.updateMember(this.member).subscribe(()=>{
      this.toastr.success("Profile updated successfully");
      this.editForm.reset(this.member);
    });
  }
}
