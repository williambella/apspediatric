import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scale } from '@appointment/models/Scale';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class ScaleService {
    private endpoint = '/scale';
    private scales: Array<Scale>;

    constructor(private httpClient: HttpClient) { }

    findAll(): Observable<Array<Scale>> {
        return !this.scales

            ? this.httpClient
                .get<Array<Scale>>(this.endpoint)
                .pipe(flatMap(scales => {
                    this.scales = scales;
                    return of(scales)
                }))

            : of(this.scales);
    }

    findById(id: string): Observable<Scale> {
        return this.httpClient.get<Scale>(`${this.endpoint}/${id}`); 
      }

    save(scale: Scale): Observable<Scale> {
        if (scale.id) {
            return this.httpClient.put<Scale>(`${this.endpoint}/${scale.id}`, scale);
        } else {
            return this.httpClient.post<Scale>(`${this.endpoint}`, scale);
        }
    }

    delete(id: string): Observable<Array<Scale>> {
        return this.httpClient.delete<Array<Scale>>(`${this.endpoint}/${id}`);
      }

}