import { SharedModule } from './shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';

@NgModule({
  imports: [
    CommonModule,
    BsDropdownModule.forRoot(),
    SharedModule
  ],
  exports: [
    BsDropdownModule
  ],
  declarations: []
})
export class CoreModule { }
