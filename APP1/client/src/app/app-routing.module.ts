import { AdminGuard } from './guards/admin.guard';
import { AdminPanelComponent } from './admin/admin-panel/admin-panel.component';
import { PreventUnsavedChangesGuard } from './guards/prevent-unsaved-changes.guard';
import { MemberEditComponent } from './member-edit/member-edit.component';
import { ServerErrorComponent } from './errors/server-error/server-error.component';
import { NotFoundComponent } from './errors/not-found/not-found.component';
import { TestErrorsComponent } from './errors/test-errors/test-errors.component';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { ProductDetailComponent } from './products/product-detail/product-detail.component';
import { AuthGuard } from './guards/auth.guard';
import { AboutComponent } from './about/about.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { ListsComponent } from './lists/lists.component';
import { ProductCreateComponent } from './admin/product-management/product-create/product-create.component';

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
      // products
      {
        path: 'products',
        loadChildren: () => import('./modules/products.module').then(p => p.ProductsModule)
      },
      { path: 'prodlists', component: ListsComponent },
      // members
      {
        path: 'members',
        loadChildren: () => import('./modules/members.module').then(m => m.MembersModule)
      },
      // member (my profile)
      { path: 'member/edit', component: MemberEditComponent, canDeactivate: [PreventUnsavedChangesGuard]},

      { path: 'admin',
      loadChildren: () => import('./modules/admin.module').then(p => p.AdminModule),
      canActivate: [AdminGuard]
      }
    ]
  },
  { path: 'about', component: AboutComponent },
  { path: 'errors', component: TestErrorsComponent },
  { path: 'not-found', component: NotFoundComponent},
  { path: 'server-error', component: ServerErrorComponent},
  {
    path: '**', // non-existing-rout
    pathMatch: 'full',
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
