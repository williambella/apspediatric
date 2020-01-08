import { LanguagesService } from '@core/services/languages.service';
import { StorageService } from '@core/services/storage.service';
import { Language } from './../../models/language';
import { Component } from '@angular/core';
import { Observable, of } from 'rxjs';

@Component({
  selector: 'app-menu-language',
  templateUrl: './menu-language.component.html',
  styles: ['menu-language.component.scss']
})
export class MenuLanguageComponent {

  private _LANGUAGES: Array<Language> = new Array<Language>();
  private _ACTUAL_LANGUAGE: Language;

  constructor(
    private storageService: StorageService,
    private languageService: LanguagesService
  ) {
    this.loadLanguages().subscribe((languages: Array<Language>) => this._LANGUAGES = languages);
    this.loadActualLanguage().subscribe((lang: Language) => this._ACTUAL_LANGUAGE = lang);
  }

  change(language: Language): void {
    this.languageService.switchLanguage(language).subscribe(() => {
      this.loadActualLanguage().subscribe((lang: Language) => this._ACTUAL_LANGUAGE = lang);
    });
  }

  get languages(): Observable<Array<Language>> {
    return of(this._LANGUAGES);
  }

  get actualLanguage(): Observable<Language> {
    return of(this._ACTUAL_LANGUAGE);
  }

  private loadLanguages(): Observable<Array<Language>> {
    return new Observable((observer) => {
      const languages: Array<Language> = this.storageService.get('langsAvailable');

      if (languages) {
        observer.next(languages);
        observer.complete();
      } else {
        observer.next(languages);
        observer.error();
      }
    });
  }

  private loadActualLanguage(): Observable<Language> {
    return new Observable((observer) => {
      const lang: Language = this.storageService.get('lang');

      if (lang) {
        observer.next(lang);
        observer.complete();
      } else {
        observer.next(lang);
        observer.error();
      }
    });
  }

}
