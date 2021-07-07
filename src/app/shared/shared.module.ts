import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

import { NgbCollapseModule, NgbDatepickerModule, NgbDropdownModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { TimeagoModule } from 'ngx-timeago';

@NgModule({
  declarations: [

  ],
  imports: [
    CommonModule,
    TimeagoModule.forChild()
  ],
  exports: [ReactiveFormsModule, NgbCollapseModule, NgbDropdownModule, NgbModalModule, TimeagoModule, NgbDatepickerModule]
})
export class SharedModule {

}