import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  NgbPaginationModule,
  NgbTypeaheadModule,
} from '@ng-bootstrap/ng-bootstrap';

import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  exports: [NgbPaginationModule, NgbTypeaheadModule, FormsModule],
})
export class NgBoostrapModule {}
