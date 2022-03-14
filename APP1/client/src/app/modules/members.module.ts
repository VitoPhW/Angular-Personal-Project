import { MemberDetailComponent } from './../members/member-detail/member-detail.component';
import { MemberListComponent } from './../members/member-list/member-list.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { MemberCardComponent } from '../members/member-card/member-card.component';
import { SharedModule } from './shared.module';


const routes: Routes = [
  { path: '', component: MemberListComponent, pathMatch: 'full' },
  { path: ':username', component: MemberDetailComponent }
]

@NgModule({
  declarations: [
    MemberListComponent,
    MemberDetailComponent,
    MemberCardComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule,
    MemberListComponent,
    MemberDetailComponent,
    MemberCardComponent
  ]
})
export class MembersModule { }
