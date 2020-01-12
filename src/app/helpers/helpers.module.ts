import { NgModule } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';
import { MaterialModule } from '@core/material/material/material.module';
import { TitleComponent } from './title/title.component';


@NgModule({
  declarations: [
    TitleComponent
  ],
  imports: [
    MaterialModule,
    TranslateModule
  ],
  exports: [
    TitleComponent,
    TranslateModule
  ]
})
export class HelpersModule { }
