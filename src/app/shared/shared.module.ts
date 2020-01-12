import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MaterialModule } from '@core/material/material/material.module';
import { RouterModule } from '@angular/router';
import { OrderModule } from 'ngx-order-pipe';
import { FilterPipeModule } from 'ngx-filter-pipe';
import { FlexLayoutModule } from '@angular/flex-layout';
import { HelpersModule } from '../helpers/helpers.module';

@NgModule({
  declarations: [
  ],
  imports: [
    CommonModule,
    OrderModule,
    FilterPipeModule,
    HelpersModule
  ],
  exports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    FlexLayoutModule,
    HelpersModule
  ],
  providers: []
})
export class SharedModule { }
