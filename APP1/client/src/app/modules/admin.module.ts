import { ProductListComponent } from './../products/product-list/product-list.component';
import { MemberListComponent } from './../members/member-list/member-list.component';
import { HasRoleDirective } from './../directives/has-role.directive';
import { UserManagementComponent } from './../admin/user-management/user-management.component';
import { ProductManagementComponent } from './../admin/product-management/product-management.component';
import { AdminPanelComponent } from './../admin/admin-panel/admin-panel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductCreateComponent } from '../admin/product-management/product-create/product-create.component';

const routes: Routes = [
  { path: '', component: AdminPanelComponent, pathMatch: 'full' },
]

@NgModule({
  declarations: [
    AdminPanelComponent,
    ProductManagementComponent,
    UserManagementComponent,
    ProductCreateComponent,
    MemberListComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    AdminPanelComponent,
    ProductManagementComponent,
    UserManagementComponent,
    MemberListComponent,
    FormsModule
  ]
})
export class AdminModule { }
