import { Component, OnInit } from '@angular/core';
import { IItem } from 'src/app/models/IItem';
import { ItemService } from 'src/app/services/item.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  items: IItem[] = []

  constructor(private itemService: ItemService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  loadItems() {
    this.itemService.getItems()
    .subscribe(items => {
      this.items = items;
    })
  }

}
