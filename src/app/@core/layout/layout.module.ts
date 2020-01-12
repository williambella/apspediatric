import { NgModule } from '@angular/core';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TemplateComponent } from './template/template.component';
import { MenuComponent } from './menu/menu.component';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { MenuLanguageComponent } from './menu-language/menu-language.component';
import { SharedModule } from 'src/app/shared/shared.module';

@NgModule({
  declarations: [
    TemplateComponent,
    MenuComponent,
    MenuTopComponent,
    PageNotFoundComponent,
    MenuLanguageComponent
  ],
  imports: [
    SharedModule,
    FlexLayoutModule
  ],
  exports: [],
  providers: []
})
export class LayoutModule { }
