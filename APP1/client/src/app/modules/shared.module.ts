import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { TabsModule } from 'ngx-bootstrap/tabs';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { NgxGalleryModule } from '@kolkov/ngx-gallery';
import { NgxSpinnerModule } from 'ngx-spinner';
import { FileUploadModule } from 'ng2-file-upload';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { ButtonsModule } from 'ngx-bootstrap/buttons';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { MemberCardComponent } from '../members/member-card/member-card.component';

@NgModule({
  declarations: [
    ProductCardComponent,
    MemberCardComponent
  ],
  imports: [
    CommonModule,
    NgxGalleryModule,
    TabsModule.forRoot(),
    BsDropdownModule.forRoot(),
    BsDatepickerModule.forRoot(),
    ToastrModule.forRoot({
      positionClass: 'toast-bottom-right',
      progressBar: true,
      maxOpened: 3,
      preventDuplicates: true,
      countDuplicates: true,
      resetTimeoutOnDuplicate: true
    }),
    NgxSpinnerModule,
    FileUploadModule,
    ButtonsModule.forRoot(),
    PaginationModule.forRoot(),
    FormsModule,
    RouterModule
  ],
  exports: [
    ToastrModule,
    TabsModule,
    NgxGalleryModule,
    BsDropdownModule,
    BsDatepickerModule,
    NgxSpinnerModule,
    FileUploadModule,
    FormsModule,
    ButtonsModule,
    PaginationModule,
    ProductCardComponent,
    MemberCardComponent
  ]
})
export class SharedModule { }
