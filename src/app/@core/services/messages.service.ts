import { LanguagesService } from './languages.service';
import { MessagesStatus } from './../enum/messages-status.enum';
import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarConfig } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class MessagesService {

  private matSnackBarConfig: MatSnackBarConfig = {
    duration: 2000
  };

  constructor(
    private snackBar: MatSnackBar,
    private langageService: LanguagesService
  ) { }

  /**
   * Display Alert Message
   *
   * @param message: string
   * @param status: MessagesStatus
   * @returns void
   */
  message(message: string, status: MessagesStatus = MessagesStatus.SUCCESS) {
    this.snackBar.open(
      this.langageService.getTranslate(message),
      String(this.langageService.getTranslate(`messages.${status}`)).toUpperCase(),
      this.matSnackBarConfig
    );
  }

  /**
   * override local matSnackBarConfig
   *
   * @param matSnackBarConfig: MatSnackBarConfig
   * @returns void
   */
  set config(matSnackBarConfig: MatSnackBarConfig) {
    this.matSnackBarConfig = matSnackBarConfig;
  }
}
