import { IProduct } from './../models/IProduct';
import { IMember } from './../models/IMember';
import { ProductService } from './../services/product.service';
import { MembersService } from './../services/members.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lists',
  templateUrl: './lists.component.html',
  styleUrls: ['./lists.component.css']
})
export class ListsComponent implements OnInit {
  members: Partial<IMember>[] = [];
  productname: string = "Parsons";

  constructor(private membersService: MembersService, private productService: ProductService) { }

  ngOnInit(): void {
    this.loadLikes();
  }

  loadLikes(){
    this.productService.getLikes(this.productname).subscribe(members => {
      this.members = members;
    })
  }

}
