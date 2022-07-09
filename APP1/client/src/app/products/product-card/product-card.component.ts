import { ToastrService } from 'ngx-toastr';
import { ProductService } from 'src/app/services/product.service';
import { IProduct } from '../../models/IProduct';
import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: IProduct;

  constructor(private productService: ProductService, private toastr: ToastrService) { }

  ngOnInit(): void {
  }

  addRemoveLike(product: IProduct, ){
    if(!product.isLiked){
      this.productService.addLike(product.productname).subscribe(() => {
        this.toastr.success(`You have liked ${product.productname}.`)
        this.product.isLiked = true;
      });
    }
    else {
      this.productService.removeLike(product.productname).subscribe(() => {
        this.toastr.info(`Like has been removed for ${product.productname}.`)
        this.product.isLiked = false;
      });
    }
  }
}
