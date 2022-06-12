import { take } from 'rxjs';
import { AccountService } from './../../services/account.service';
import { ProductParams } from './../../models/productParams';
import { Component, OnInit } from '@angular/core';
import { IPagination } from 'src/app/models/IPagination';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';
import { IUser } from 'src/app/models/IUser';

type OptionsArray = {value: string, display: string};

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: IProduct[] = [];
  pagination: IPagination;
  categories: OptionsArray[] = [];
  productParams: ProductParams;

  constructor(private productService: ProductService, private categoryService: CategoryService) {
    this.productParams = this.productService.ProductParams;
  }

  ngOnInit(): void {
    this.loadProducts();
    this.getCategories();
  }

  loadProducts() {
    this.productService.ProductParams = this.productParams;
    this.productService.getProducts(this.productParams).subscribe(
      res => {
        this.products = res.result;
        this.pagination = res.pagination;
      }
    )
  }

  pageChanged({page}: any ) {
    this.productParams.pageNumber = page;
    this.productService.ProductParams = this.productParams;
    this.loadProducts();
  }

  resetFilters() {
    this.productParams = this.productService.resetProductParams();
    this.loadProducts();
  }

  getCategories() {
    this.categoryService.getCategoryNames().subscribe(response => {
      response.forEach(
        element => {
          this.categories.push({
            value: element,
            display: element
          });
      });
    }, error => {
      console.log('Failed to transfer categories', error);
    });
  }

}


