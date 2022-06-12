import { CategoryService } from 'src/app/services/category.service';
import { ProductService } from 'src/app/services/product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

type OptionsArray = {value: string, display: string};
@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  @Output() cancelCreate = new EventEmitter<boolean>();
  createForm: FormGroup;
  categories: OptionsArray[] = [];

  constructor(
    private productService: ProductService,
    private categoryService: CategoryService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
    this.getCategories();
  }

  create() {
    this.productService.create(this.createForm.value).subscribe(
      response => {
        this.router.navigate(['/products/'+`${this.createForm.value.productname}`]);
        this.cancel();
      }
    )
  }

  cancel() {
    this.cancelCreate.emit(false);
  }

  initializeForm() {
    this.createForm = this.fb.group({
      productname: ['', Validators.required],
      productDescription:['', Validators.required],
      categoryName: ['', [Validators.required]],
      unitPrice: ['', Validators.required, Validators.min(0)],
      unitsInStock: ['', Validators.required, Validators.min(0)]
    });
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
