import { UrlInterceptor } from './../interceptors/url.interceptor';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { TemplateComponent } from './template/template.component';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LanguagesService } from '../services/languages.service';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { StorageService } from './../services/storage.service';
import { MenuComponent } from './menu/menu.component';
import { MenuTopComponent } from './menu-top/menu-top.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SharedModule } from '@core/shared/shared/shared.module';
import { MenuLanguageComponent } from './menu-language/menu-language.component';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

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
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: UrlInterceptor,
      multi: true
    },
    {
      provide: APP_INITIALIZER,
      useFactory: (languageService: LanguagesService) => () => languageService.init(),
      deps: [
        LanguagesService,
        StorageService
      ],
      multi: true
    }
  ]
})
export class LayoutModule { }
