import { MemberDetailComponent } from './../members/member-detail/member-detail.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from './shared.module';


const routes: Routes = [
  { path: ':username', component: MemberDetailComponent }
]

@NgModule({
  declarations: [
    MemberDetailComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    MemberDetailComponent
  ]
})
export class MembersModule { }
