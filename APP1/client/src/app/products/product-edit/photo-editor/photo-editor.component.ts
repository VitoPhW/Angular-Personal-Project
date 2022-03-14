import { AccountService } from './../../../services/account.service';
import { IUser } from './../../../models/IUser';
import { environment } from './../../../../environments/environment';
import { Component, Input, OnInit } from '@angular/core';
import { FileUploader, FileUploaderOptions } from 'ng2-file-upload';
import { IItem } from 'src/app/models/IItem';
import { take } from 'rxjs/operators';
import { Photo } from 'src/app/models/IPhoto';

@Component({
  selector: 'app-photo-editor',
  templateUrl: './photo-editor.component.html',
  styleUrls: ['./photo-editor.component.css']
})
export class PhotoEditorComponent implements OnInit {
  @Input() item: IItem

  uploader: FileUploader;
  hasBaseDropZoneOver: boolean = false;
  baseUrl = environment.apiUrl;
  user: IUser;

  constructor(private accountService: AccountService, private productsService: Product) {
    this.accountService.currentUser$.pipe(take(1)).subscribe(user => this.user = user as IUser);
  }

  ngOnInit(): void {
    this.initializeUploader();
  }

  initializeUploader() {
    const options: FileUploaderOptions = {
      url: `${this.baseUrl}products/add-photo/${this.item.productname}`,
      authToken: `Bearer ${this.user.token}`,
      isHTML5: true,
      allowedFileType: ['image'],
      removeAfterUpload: true,
      autoUpload: false,
      maxFileSize: 10 * 1024 * 1024
    }
    this.uploader = new FileUploader(options)
    this.uploader.onAfterAddingFile = (file) => {
      file.withCredentials = false; // here change to admin rights only, on photo upload.
    }
    this.uploader.onSuccessItem = (item, response, status, headers) => {
      if (response) {
        const photo = JSON.parse(response);
        this.item.photos.push(photo);

      }
    }
  }

  fileOverBase(e: any) {
    this.hasBaseDropZoneOver = e;
  }

  setMainPhoto(photo: Photo){
    ths/
  }

}
