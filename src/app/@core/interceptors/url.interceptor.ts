import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { appSettings } from 'src/environments/app.settings';

@Injectable()
export class UrlInterceptor implements HttpInterceptor {

  intercept(httpRequest: HttpRequest<any>, httpHandler: HttpHandler): Observable<HttpEvent<any>> {
    if (httpRequest.url.startsWith('./')) {
      return httpHandler.handle(httpRequest);
    } else {
      return httpHandler.handle(httpRequest.clone({
        url: `${appSettings.apiProtocol}://${appSettings.apiUrl}${httpRequest.url}`
      }));
    }
  }

}
