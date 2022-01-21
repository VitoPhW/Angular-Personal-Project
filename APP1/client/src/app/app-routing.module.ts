import { AboutComponent } from './about/about.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { ProductListComponent } from './products/product-list/product-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';

const routes: Routes = [
  {
    path:'',
    component: HomeComponent,
    pathMatch: 'full'
  },
  {
    path: 'products', //localhost:4200/products
    component: ProductListComponent
  },
  {
    path: 'products/:prodname', //localhost:4200/products/Pooh-mask-L
    component: ProductDetailComponent
  },
  {
    path: 'prodlists',
    component: ListsComponent
  },
  {
    path: 'about',
    component: AboutComponent
  },
  {
    path: '**', // non-existing-rout
    pathMatch: 'full',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
