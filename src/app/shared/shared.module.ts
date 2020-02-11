import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@core/material/material/material.module';
import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HelpersModule } from '../helpers/helpers.module';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
  ],
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
