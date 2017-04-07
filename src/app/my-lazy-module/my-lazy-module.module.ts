import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

import { BarComponent } from 'app/bar/bar.component';

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild([{
      path: '',
      children: [{
        path: '',
        component: BarComponent
      }]
    }])
  ],
  declarations: [
    BarComponent
  ]
})
export class MyLazyModuleModule { }
