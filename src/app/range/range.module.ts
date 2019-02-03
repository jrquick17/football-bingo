import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {FormsModule} from '@angular/forms';
import {IonicModule} from '@ionic/angular';

import {RangePipe} from './range.pipe';

@NgModule({
  exports: [
    RangePipe
  ],
  imports: [
    CommonModule,
    FormsModule,
    IonicModule
  ],
  declarations: [
    RangePipe
  ]
})
export class RangeModule {}
