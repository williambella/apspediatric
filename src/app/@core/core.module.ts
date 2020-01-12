import { StorageService } from '@core/services/storage.service';
import { NgModule, APP_INITIALIZER } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from './material/material/material.module';
import { HttpClientModule, HttpClient, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AngularWebStorageModule, LocalStorageService } from 'angular-web-storage';
import { ReactiveFormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';
import { LanguagesService } from './services/languages.service';
import { UrlInterceptor } from './interceptors/url.interceptor';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule,
    MaterialModule,
    HttpClientModule,
    AngularWebStorageModule,
    ReactiveFormsModule,
    FlexLayoutModule,
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: (createTranslateLoader),
        deps: [HttpClient]
      }
    })
  ],
  exports: [
    TranslateModule
  ],
  providers: [
    LocalStorageService,
    LanguagesService,
    StorageService,
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
export class CoreModule { }
