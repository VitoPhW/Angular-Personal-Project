import { take } from 'rxjs';
import { AccountService } from './../../services/account.service';
import { ProductParams } from './../../models/productParams';
import { Component, OnInit } from '@angular/core';
import { IPagination } from 'src/app/models/IPagination';
import { IProduct } from 'src/app/models/IProduct';
import { ProductService } from 'src/app/services/product.service';
import { CategoryService } from 'src/app/services/category.service';

type OptionsArray = {value: string, display: string};

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css']
})
export class ProductListComponent implements OnInit {

  products: IProduct[] = [];
  pagination: IPagination;
  productParams: ProductParams;
  client: AccountService;
  categories: OptionsArray[] = [];

  constructor(private productService: ProductService, private accountService: AccountService, private categoryService: CategoryService) {
    accountService.currentUser$ // runs in sync mode, because of currentUser$ is created localy, but not on server.
    .pipe(take(1))
    .subscribe(
      (client: any) => {
        this.client = client;
        this.productParams = new ProductParams();
        // this.productParams.pageNumber = 1;
        // this.productParams.pageSize = 5;
        // this.productParams.minPrice = 0;
        // this.productParams.maxPrice = 3425;
      }
    )
  }

  ngOnInit(): void {
    this.loadProducts();
    this.getCategories();
  }

  loadProducts() {
    this.productService.getProducts(this.productParams).subscribe(
      res => {
        this.products = res.result;
        this.pagination = res.pagination;
      }
    )
  }
  pageChanged({page}: any ) {
    this.productParams.pageNumber = page;
    this.loadProducts();
  }

  resetFilters() {
    this.productParams = new ProductParams();
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
    }, () => {
      console.log('Categories transfer complete');
    });
  }

}


