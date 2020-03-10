import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent, HttpResponse, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { UserService } from '@core/services/user.service';
import { MessagesStatus } from '@core/enum/messages-status.enum';
import { MessagesService } from '@core/services/messages.service';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {
  constructor(
    private userService: UserService,
    private messagesService: MessagesService,
  ) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((error: HttpErrorResponse) => {
        switch (error.status) {
          case 0:
            this.messagesService.message('auth.network_error', MessagesStatus.NETWORK);
            break;
          case 400:
            this.messagesService.message('auth.warning', MessagesStatus.WARNING);
            break;
          case 401:
          case 403:
            this.userService.gotoLogin();
            break;
          default:
            break;
        }
        return throwError(error);
      })
    );
  }
}
