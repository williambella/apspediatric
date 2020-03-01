import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { Question } from '../models/question';

@Injectable({
  providedIn: 'root'
})
export class QuestiontService {

  private endpoint = '/question';

  constructor(private httpClient: HttpClient) { }
  /**
   * Find a Question by Id
   *
   * @param id: string
   * @returns Observable<Question>
   */
  findAllByGroupId(id: string): Observable<Array<Question>> {
    const params = new HttpParams()
    .set('idGroup', String(id));

    return this.httpClient.get<Array<Question>>(`${this.endpoint}`, { params });
  }

  /**
   * Find a Question by Id
   *
   * @param id: string
   * @returns Observable<Question>
   */
  findById(id: string): Observable<Question> {
    const params = new HttpParams()
    .set('id', String(id));

    return this.httpClient.get<Question>(`${this.endpoint}/findById`, { params });
  }

  /**
   * Create or Update an Group
   *
   * @param group: Group
   * @returns Observable<Group>
   */
  save(question: Question): Observable<Question> {
    // TODO: Fix Route ro Update with /edit
    if (question.id) {
      return this.httpClient.put<Question>(`${this.endpoint}/`, question);
    } else {
      return this.httpClient.post<Question>(`${this.endpoint}/save`, question);
    }
  }

  /**
   * Delete Question by Id
   *
   * @param id: string
   * @returns Observable<Array<any>>
   */
  delete(id: string): Observable<any> {
    // TODO: Fix Route to delete
    const params = new HttpParams()
    .set('id', String(id));

    return this.httpClient.delete<any>(`${this.endpoint}/`, { params });
  }

}
