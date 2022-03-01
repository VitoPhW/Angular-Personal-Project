import { SharedModule } from './shared.module';
import { Routes, RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductListComponent } from '../products/product-list/product-list.component';
import { ProductDetailComponent } from '../products/product-detail/product-detail.component';
import { ProductCardComponent } from '../products/product-card/product-card.component';
import { ProductEditComponent } from '../products/product-edit/product-edit.component';
import { PreventUnsavedProdEditGuard } from '../guards/prevent-unsaved-prod-edit.guard';

const routes: Routes = [
  { path: '', component: ProductListComponent, pathMatch: 'full' },
  { path: ':productname', component: ProductDetailComponent },
  { path: ':productname/edit', component: ProductEditComponent, canDeactivate: [PreventUnsavedProdEditGuard] }
]

@NgModule({
  declarations: [
    ProductListComponent,
    ProductDetailComponent,
    ProductCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    ProductListComponent,
    ProductDetailComponent,
    ProductCardComponent
  ]
})
export class ProductsModule { }
