import { LanguagesService } from '@core/services/languages.service';
import { Injectable } from '@angular/core';
import Swal, { SweetAlertIcon } from 'sweetalert2';


export interface DialogConfirmSettings  {
  title?: string;
  text?: string;
  icon?: string;
  showCancelButton?: boolean;
  confirmButtonText?: string;
  cancelButtonText?: string;
}

export interface DialogConfirmAction {
  value?: boolean;
  dismiss?: string;
}

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  constructor(private languageService: LanguagesService) {
  }

  confirm(dialogConfirmSettings?: DialogConfirmSettings): Promise<any> {
    return Swal.fire({
      title: dialogConfirmSettings.title || this.languageService.getTranslate('dialog.confirm.title'),
      text: dialogConfirmSettings.title || this.languageService.getTranslate('dialog.confirm.text'),
      icon: dialogConfirmSettings.title as SweetAlertIcon || 'warning',
      showCancelButton: dialogConfirmSettings.showCancelButton || true,
      confirmButtonText: dialogConfirmSettings.confirmButtonText || this.languageService.getTranslate('dialog.confirm.confirm'),
      cancelButtonText: dialogConfirmSettings.cancelButtonText || this.languageService.getTranslate('dialog.confirm.cancel')
    });
  }
}
