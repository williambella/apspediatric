import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Procedure } from '@appointment/models/Procedure';

@Injectable({ providedIn: 'root' })
export class ProcedureService {
    private endpoint = '/procedure';

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Array<Procedure>> {
        return this.httpClient.get<Array<Procedure>>(this.endpoint);
    }

    findById(id: string): Observable<Procedure> {
        return this.httpClient.get<Procedure>(`${this.endpoint}/${id}`); 
      }

    save(procedure: Procedure): Observable<Procedure> {
        if (procedure.id) {
          return this.httpClient.put<Procedure>(`${this.endpoint}/${procedure.id}`, procedure);
        } else {
          return this.httpClient.post<Procedure>(`${this.endpoint}`, procedure);
        }
      }
    
      /**
       * Delete Procedure by Id
       *
       * @param id: string
       * @returns Observable<Array<Procedure>>
       */
      delete(id: string): Observable<Array<Procedure>> {
        return this.httpClient.delete<Array<Procedure>>(`${this.endpoint}/${id}`);
      }

}