import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group';
import { Question } from '@appointment/models/question';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private endpoint = '/group';

  constructor(private httpClient: HttpClient) { }

  /**
   * Find a Group by Id
   *
   * @param id: string
   * @returns Observable<Question>
   */
  findById(id: string): Observable<Group> {
    const params = new HttpParams()
    .set('id', String(id));

    return this.httpClient.get<Group>(`${this.endpoint}/findById`, { params });
  }

  /**
   * Create or Update an Group
   *
   * @param group: Group
   * @returns Observable<Group>
   */
  save(group: Group): Observable<Group> {
    return this.httpClient.post<Group>(`${this.endpoint}/${group.id ? 'edit' : 'save'}`, group);
  }
}
