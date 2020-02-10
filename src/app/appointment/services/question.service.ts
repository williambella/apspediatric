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

  findById(id: number): Observable<Question> {
    const params = new HttpParams()
    .set('cdAdmMunSolicitacao', String(id));

    return this.httpClient.get<Question>(`${this.endpoint}/findById`, { params });
  }
}
