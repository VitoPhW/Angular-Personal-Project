import { ItemService } from 'src/app/services/item.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {

  constructor(private itemService: ItemService,
    private route: ActivatedRoute) { }

  ngOnInit() {
  }

}
