import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Language } from '../models/language';
import { TranslateService } from '@ngx-translate/core';
import { StorageService } from './storage.service';
import { Injectable, OnDestroy } from '@angular/core';
import { Subscription, Observable } from 'rxjs';
import { OrderPipe } from 'ngx-order-pipe';
import { FilterPipe } from 'ngx-filter-pipe';

@Injectable()
export class LanguagesService implements OnDestroy {
  private langs: Array<Language>;
  private defaultLanguage: Language;

  arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private translateService: TranslateService,
    private storageService: StorageService,
    private http: HttpClient,
    private orderPipe: OrderPipe,
    private filterPipe: FilterPipe
  ) { }

  init(): Promise<any> {
    return new Promise((resolve: any) => {
      const languageListSubscription: Subscription = this.http.get<Array<Language>>('/language')
      .subscribe((langs: Array<Language>) => {
        langs = this.filterPipe.transform(this.orderPipe.transform(langs, 'title', true), {status: true});

        this.storageService.set('langsAvailable', langs);

        this.translateService.addLangs(
          langs.map((lang: Language) => String(lang.abbrev).toLocaleLowerCase())
        );

        this.defaultLanguage = this.geCurrenttLang() || langs.find((lang: Language) => lang.def === true);

        this.switchLanguage(this.defaultLanguage).subscribe(() => {
          resolve();
        });
      });

      this.arraySubscriptions = [...this.arraySubscriptions, languageListSubscription];
    });
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  switchLanguage(lang: Language): Observable<any> {
    return new Observable(observable => {
      this.translateService.use(String(lang.abbrev).toLocaleLowerCase())
      .subscribe(
        () => {
          this.storageService.set('lang', lang);
          observable.next();
          observable.complete();
        },
        (err: HttpErrorResponse) => {
          observable.next(err);
          observable.complete();
        }
      );
    });
  }

  getTranslate(key: any): string {
    return this.translateService.instant(key);
  }

  getLangs(): string[] {
    return this.translateService.getLangs();
  }

  geCurrenttLang(): Language {
    return this.storageService.get('lang') as Language;
  }
}
