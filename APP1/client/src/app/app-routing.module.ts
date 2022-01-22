import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './about/about.component';
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
    path: '',
    canActivate: [AuthGuard],
    runGuardsAndResolvers: 'always',
    children: [
      {
        path: 'products',
        loadChildren: () => import('./modules/products.module').then(p => p.ProductsModule)
      },
      { path: 'prodlists', component: ListsComponent }
    ]
  },
  {
    path: 'about',
    component: AboutComponent,
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
