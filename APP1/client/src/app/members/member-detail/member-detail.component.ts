import { IPagination, PaginatedResult } from './../../models/IPagination';
import { LikedProductsParams } from './../../models/likedProductsParams';
import { MembersService } from './../../services/members.service';
import { Component, OnInit } from '@angular/core';
import { IMember } from 'src/app/models/IMember';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {

  member: IMember;
  products: Partial<(IProduct | undefined)>[] = [];
  pagination: IPagination;
  likedProductsParams: LikedProductsParams;

  constructor(private membersService: MembersService, private route: ActivatedRoute) {
    this.likedProductsParams = this.membersService.likedProductsParams;
   }

  ngOnInit() {
    this.loadMember();
    this.loadLikes();
  }

  loadMember() {
    const username = this.route.snapshot.paramMap.get('username') as string;
    this.membersService.getMember(username).subscribe(member => this.member = member);
  }

  loadLikes(){
    this.likedProductsParams.userName = this.member.userName;
    this.membersService.getLikes(this.member.userName, this.likedProductsParams.pageNumber, this.likedProductsParams.pageSize).subscribe(products => {
      this.products = products.result;
      this.pagination = products.pagination;
    })
  }
}
