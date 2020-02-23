import { Injectable } from '@angular/core';
import { MessagesService } from '@core/services/messages.service';
import { Observable } from 'rxjs';

@Injectable()
export abstract class CanDeactiveAbstract {
  messageService: MessagesService;

  canDeactivate(dirty: boolean): Observable<boolean> | boolean {
    return dirty ? this.messageService.confirm() : true;
  }

}
