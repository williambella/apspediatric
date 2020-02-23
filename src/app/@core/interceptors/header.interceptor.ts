import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpHeaders } from '@angular/common/http';
import { LanguagesService } from '@core/services/languages.service';
import { Observable } from 'rxjs';
import { UserService } from '@core/services/user.service';
import { User } from '@core/models/user';
import { Language } from '@core/models/language';

@Injectable()
export class HeaderInterceptor implements HttpInterceptor  {
  constructor(
    private languageService: LanguagesService,
    private userService: UserService
    ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    let headers = new HttpHeaders();

    const currentLang: Language = this.languageService.geCurrenttLang();
    const user: User = this.userService.getUser();

    headers =  headers.set('Content-Type', 'application/json');

    if (currentLang) {
      headers = headers.set('idLang', this.languageService.geCurrenttLang().id);
    }

    if (user) {
      headers = headers.set('Authorization', `${user.bearer} ${user.token}`);
    }

    return next.handle(req.clone({headers}));
  }
}
