import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Treatment } from '@appointment/models/Treatment';

@Injectable({providedIn: 'root'})
export class TreatmentService {
    private endpoint = '/treatment';

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Array<Treatment>> {
        return this.httpClient.get<Array<Treatment>>(this.endpoint);
    }
    
    save(treatment: Treatment): Observable<Treatment> {
        if (treatment.id) {
          return this.httpClient.put<Treatment>(`${this.endpoint}/${treatment.id}`, treatment);
        } else {
          return this.httpClient.post<Treatment>(`${this.endpoint}`, treatment);
        }
      }

      findById(id: string): Observable<Treatment> {
        return this.httpClient.get<Treatment>(`${this.endpoint}/${id}`); 
      }

      delete(id: string): Observable<Array<Treatment>> {
        return this.httpClient.delete<Array<Treatment>>(`${this.endpoint}/${id}`);
      }

}