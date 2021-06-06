import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
      
  ];
@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports:[
    LayoutComponent,
  ]
})
export class LayoutModule { }


