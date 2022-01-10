import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '../../shared/shared.module';
import { Routes, RouterModule } from '@angular/router';
import { IndexComponent } from './index/index.component';
import { CreateComponent } from './create/create.component';

const routes: Routes = [
  { path: '', component: IndexComponent },
  { path: 'index', component: IndexComponent },
  { path: 'create', component: CreateComponent },
];

@NgModule({
  declarations: [
    IndexComponent,
    CreateComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedModule

  ]
})
export class BookingsModule { }
