import { ItemService } from 'src/app/services/item.service';
import { IItem } from 'src/app/models/IItem';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  item: IItem;

  constructor(private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadItem();
  }

  loadItem() {
    const productname = this.route.snapshot.paramMap.get('productname') as string;
    this.itemService.getItem(productname).subscribe(item => this.item = item);
  }

}
