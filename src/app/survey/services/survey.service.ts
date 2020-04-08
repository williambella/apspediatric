import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '@appointment/models/question';
import { Observable, Subscription, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private endpoint = '/response';
  private formArray: Array<FormGroup> = [];
  private finishSubject = new Subject<boolean>();

  constructor(private httpClient: HttpClient) { }

  /**
   * Save Responses
   *
   * @param questions: Array<Question>
   * @returns Observable<Group>
   */
  save(questions: Array<Question>): Observable<Array<any>> {
    return this.httpClient.post<Array<any>>(`${this.endpoint}`, questions);
  }

  setForm(form: FormGroup) {
    this.formArray.push(form);
  }

  getFormList(): Array<FormGroup> {
    return this.formArray;
  }

  onSurveyFinish(): Observable<boolean> {
    return this.finishSubject;
  }

  finishSurvey(): void {
    return this.finishSubject.next();
  }
}
