import { HasRoleDirective } from './../directives/has-role.directive';
import { UserManagementComponent } from './../admin/user-management/user-management.component';
import { ProductManagementComponent } from './../admin/product-management/product-management.component';
import { AdminPanelComponent } from './../admin/admin-panel/admin-panel.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from './shared.module';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: AdminPanelComponent, pathMatch: 'full' },
  // { path: ':productname', component: ProductDetailComponent },
  // { path: ':productname/edit', component: ProductEditComponent, canDeactivate: [PreventUnsavedProdEditGuard] }
]

@NgModule({
  declarations: [
    AdminPanelComponent,
    ProductManagementComponent,
    UserManagementComponent,
    HasRoleDirective
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    AdminPanelComponent,
    ProductManagementComponent,
    UserManagementComponent,
    HasRoleDirective
  ]
})
export class AdminModule { }
