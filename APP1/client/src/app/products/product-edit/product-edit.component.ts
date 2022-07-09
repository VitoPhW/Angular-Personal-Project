import { ProductService } from 'src/app/services/product.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IProduct } from 'src/app/models/IProduct';
import { ToastrService } from 'ngx-toastr';
import { NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  product: IProduct;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];



  constructor(private productService: ProductService,
    private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadProduct();
  }

  loadProduct() {
    const productname = this.route.snapshot.paramMap.get('productname') as string;
    this.productService.getProduct(productname).subscribe(product => {
      this.product = product;
      this.galleryImages = this.getImages();
    });
  }

  getImages(): NgxGalleryImage[] {
    const imgUrls: NgxGalleryImage[] = [];
    for (const photo of this.product.photos) {
      imgUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imgUrls;
  }

  updateProduct() {
    this.productService.updateProduct(this.product).subscribe(()=>{
      this.toastr.success("Profile updated successfully");
      this.editForm.reset(this.product);
    });
  }

}
