import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Group } from '../models/group';

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  private endpoint = '/group';

  constructor(private httpClient: HttpClient) { }

  /**
   * Find All
   *
   * @returns Observable<Array<Group>>
   */
  findAll(): Observable<Array<Group>> {
    return this.httpClient.get<Array<Group>>(this.endpoint);
  }

  /**
   * Find a Group by Id
   *
   * @param id: string
   * @returns Observable<Group>
   */
  findById(id: string): Observable<Group> {
    return this.httpClient.get<Group>(`${this.endpoint}/findById/${id}`);
  }

  /**
   * Create or Update an Group
   *
   * @param group: Group
   * @returns Observable<Group>
   */
  save(group: Group): Observable<Group> {
    if (group.id) {
      return this.httpClient.put<Group>(`${this.endpoint}/edit`, group);
    } else {
      return this.httpClient.post<Group>(`${this.endpoint}/save`, group);
    }
  }

  /**
   * Delete Group by Id
   *
   * @param id: string
   * @returns Observable<Array<Group>>
   */
  delete(id: string): Observable<Array<Group>> {
    return this.httpClient.delete<Array<Group>>(`${this.endpoint}/${id}`);
  }
}
