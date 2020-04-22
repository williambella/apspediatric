import { Responsible } from './../models/responsible';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ResponsibleService {

  private endpoint = '/responsible';

  constructor(private httpClient: HttpClient) { }

  /**
   * Create or Update an Responsinle
   *
   * @param responsible: Responsible
   * @returns Observable<Responsible>
   */
  save(responsible: Responsible): Observable<Responsible> {
    if (responsible.id) {
      return this.httpClient.put<Responsible>(`${this.endpoint}/${responsible.id}`, responsible);
    } else {
      return this.httpClient.post<Responsible>(`${this.endpoint}`, responsible);
    }
  }

  findById(id: string): Observable<Responsible> {
      return this.httpClient.get<Responsible>(`${this.endpoint}/${id}`);
  }
}
