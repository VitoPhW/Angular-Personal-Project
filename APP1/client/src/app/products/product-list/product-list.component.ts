import { Component, OnInit } from '@angular/core';
import { IPagination } from 'src/app/models/IPagination';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: IProduct[] = []
  pagination: IPagination;
  pageNumber: number = 1;
  pageSize: number = 6;

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts() {
    this.productService.getProducts(this.pageNumber, this.pageSize).subscribe(
      res => {
        this.products = res.result;
        this.pagination = res.pagination;
      }
    )
  }
  pageChanged({page}: any ) {
    this.pageNumber = page;
    this.loadProducts();
  }

}
