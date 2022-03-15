import { ProductService } from 'src/app/services/product.service';
import { IProduct } from 'src/app/models/IProduct';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgxGalleryImage } from '@kolkov/ngx-gallery';
import { NgxGalleryAnimation } from '@kolkov/ngx-gallery';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {

  product: IProduct;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private productService: ProductService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadProduct();

    this.galleryOptions = [
      {
        width: '500px',
        height: '500px',
        imagePercent: 100,
        thumbnailsColumns: 4,
        imageAnimation: NgxGalleryAnimation.Slide,
        preview: false
      },
      // max-width 800
      {
        breakpoint: 800,
        width: '100%',
        height: '600px',
        imagePercent: 80,
        thumbnailsPercent: 20,
        thumbnailsMargin: 20,
        thumbnailMargin: 20
      },
      // max-width 400
      {
        breakpoint: 400,
        preview: false
      }
    ];

    // this.galleryImages = [
    //   {
    //     small: 'https://picsum.photos/362/210.jpg',
    //     medium: 'https://picsum.photos/362/210.jpg',
    //     big: 'https://picsum.photos/362/210.jpg'
    //   },
    //   {
    //     small: 'https://picsum.photos/362/210.jpg',
    //     medium: 'https://picsum.photos/362/210.jpg',
    //     big: 'https://picsum.photos/362/210.jpg'
    //   },
    //   {
    //     small: 'https://picsum.photos/362/210.jpg',
    //     medium: 'https://picsum.photos/362/210.jpg',
    //     big: 'https://picsum.photos/362/210.jpg'
    //   },{
    //     small: 'https://picsum.photos/362/210.jpg',
    //     medium: 'https://picsum.photos/362/210.jpg',
    //     big: 'https://picsum.photos/362/210.jpg'
    //   },
    //   {
    //     small: 'https://picsum.photos/362/210.jpg',
    //     medium: 'https://picsum.photos/362/210.jpg',
    //     big: 'https://picsum.photos/362/210.jpg'
    //   }
    // ];
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

  loadProduct() {
    const productname = this.route.snapshot.paramMap.get('productname') as string;
    this.productService.getProduct(productname).subscribe(product => {
      this.product = product;
      this.galleryImages = this.getImages();
    });
  }

}
