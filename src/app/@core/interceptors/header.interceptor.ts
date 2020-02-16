import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { LanguagesService } from '@core/services/languages.service';
import { Observable } from 'rxjs';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor  {
  constructor(private languageService: LanguagesService) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    const headers = new HttpHeaders();

    const currentLang = this.languageService.geCurrenttLang();

    if (currentLang) {
      headers.set('idLang', this.languageService.geCurrenttLang().id);
    }


    return next.handle(req.clone({headers}));
  }

}
