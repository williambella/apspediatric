import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Type } from '@appointment/models/type';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TypeService {

  private endpoint = '/type';

  constructor(private httpClient: HttpClient) { }

  /**
   * Find All types
   *
   * @returns Observable<Array<Type>>
   */
  findAll(): Observable<Array<Type>> {
    return this.httpClient.get<Array<Type>>(this.endpoint);
  }
}
