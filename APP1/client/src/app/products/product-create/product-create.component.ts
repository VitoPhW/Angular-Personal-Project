import { ProductService } from 'src/app/services/product.service';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-product-create',
  templateUrl: './product-create.component.html',
  styleUrls: ['./product-create.component.css']
})
export class ProductCreateComponent implements OnInit {

  @Output() cancelCreate = new EventEmitter<boolean>();
  createForm: FormGroup;

  constructor(
    private productService: ProductService,
    private fb: FormBuilder,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeForm();
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
      categoryName: ['', Validators.required],
      unitPrice: ['', Validators.required],
      unitsInStock: ['', Validators.required]
    });
  }

}
