import { ItemService } from 'src/app/services/item.service';
import { Component, HostListener, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { IItem } from 'src/app/models/IItem';
import { ToastrService } from 'ngx-toastr';
import { NgxGalleryAnimation, NgxGalleryImage, NgxGalleryOptions } from '@kolkov/ngx-gallery';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.css']
})
export class ProductEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  item: IItem;

  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }
  galleryOptions: NgxGalleryOptions[];
  galleryImages: NgxGalleryImage[];



  constructor(private itemService: ItemService,
    private route: ActivatedRoute, private toastr: ToastrService) { }

  ngOnInit() {
    this.loadItem();

    // this.galleryOptions = [
    //   {
    //     width: '500px',
    //     height: '500px',
    //     imagePercent: 100,
    //     thumbnailsColumns: 4,
    //     imageAnimation: NgxGalleryAnimation.Slide,
    //     preview: false
    //   },
    //   // max-width 800
    //   {
    //     breakpoint: 800,
    //     width: '100%',
    //     height: '600px',
    //     imagePercent: 80,
    //     thumbnailsPercent: 20,
    //     thumbnailsMargin: 20,
    //     thumbnailMargin: 20
    //   },
    //   // max-width 400
    //   {
    //     breakpoint: 400,
    //     preview: false
    //   }
    // ];
  }

  loadItem() {
    const productname = this.route.snapshot.paramMap.get('productname') as string;
    this.itemService.getItem(productname).subscribe(item => {
      this.item = item;
      this.galleryImages = this.getImages();
    });
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

  updateItem() {
    this.itemService.updateItem(this.item).subscribe(()=>{
      this.toastr.success("Profile updated successfully");
      this.editForm.reset(this.item);
    });
  }

}
