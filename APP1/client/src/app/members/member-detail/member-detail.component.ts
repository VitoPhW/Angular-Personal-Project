import { MembersService } from './../../services/members.service';
import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/models/IMember';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  member: IMember;

  constructor(private memberService: MembersService, private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadMember();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username') as string;
    this.memberService.getMember(username).subscribe(member => this.member = member);
  }
}
