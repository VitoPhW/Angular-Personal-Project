import { ItemService } from 'src/app/services/item.service';
import { IItem } from 'src/app/models/IItem';
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

  item: IItem;
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];

  constructor(private itemService: ItemService, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadItem();

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
    for (const photo of this.item.photos) {
      imgUrls.push({
        small: photo.url,
        medium: photo.url,
        big: photo.url
      })
    }
    return imgUrls;
  }

  loadItem() {
    const productname = this.route.snapshot.paramMap.get('productname') as string;
    this.itemService.getItem(productname).subscribe(item => {
      this.item = item;
      this.galleryImages = this.getImages();
    });
  }

}
