import { AccountService } from './../../../services/account.service';
import { IUser } from './../../../models/IUser';
import { environment } from './../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { IProduct } from 'src/app/models/IProduct';
import { take } from 'rxjs/operators';
import { Photo } from 'src/app/models/IPhoto';
import { ProductService } from 'src/app/services/product.service';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() product: IProduct

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  baseUrl = environment.apiUrl;
  user: IUser;

  constructor(private accountService: AccountService, private productsService: ProductService) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user as IUser);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  initializeUploader() {
    const options: FileUploaderOptions = {
      url: `${this.baseUrl}products/add-photo/${this.product.productname}`,
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    }
    this.uploader = new FileUploader(options)
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false;
    }
    this.uploader.onSuccessItem = (product, response, status, headers) => {
      if (response) {
        const photo:Photo = JSON.parse(response);
        this.product.photos.push(photo);

        if(photo.isMain){
          this.product.photoUrl = photo.url;
          this.accountService.setCurrentUser(this.user);
        }
      }
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo, productName: string) {
    this.productsService.setMainPhoto(photo.id, productName).subscribe(() => {
      this.product.photoUrl = photo.url;
      this.product.photos.forEach(p => p.isMain = (p.id===photo.id)
      );
    })
  }

  deletePhoto(photoId: number, productName: string) {
    this.productsService.deletePhoto(photoId, productName).subscribe(()=> {
      this.product.photos = this.product.photos.filter(p => p.id !== photoId);
    })
  }

}
