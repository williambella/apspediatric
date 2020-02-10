import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@core/material/material/material.module';
import { TitleComponent } from './title/title.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TableComponent, BtnActionsDirective, TableHeaderDirective, TableColumnsDirective } from './table/table.component';

@NgModule({
  declarations: [
    TitleComponent,
    TableComponent,
    BtnActionsDirective,
    TableHeaderDirective,
    TableColumnsDirective
  ],
  imports: [
    CommonModule,
    MaterialModule,
    TranslateModule,
    FlexLayoutModule
  ],
  exports: [
    TitleComponent,
    TableComponent,
    TranslateModule,
    BtnActionsDirective,
    TableHeaderDirective,
    TableColumnsDirective
  ]
})
export class HelpersModule { }
