import { Question } from '@appointment/models/question';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private endpoint = '/response';

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
}
