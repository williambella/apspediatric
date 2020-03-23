import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@core/material/material/material.module';
import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HelpersModule } from '../helpers/helpers.module';
import { ReactiveFormsModule } from '@angular/forms';
import { NumbersDirective } from './directives/numbers.directive';
import { MaskDirective } from './directives/mask.directive';

@NgModule({
  declarations: [
  NumbersDirective,
  MaskDirective],
  imports: [
    CommonModule,
    OrderModule,
    FilterPipeModule,
    HelpersModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    HelpersModule,
    ReactiveFormsModule
  ],
  providers: []
})
export class SharedModule { }
