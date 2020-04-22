import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evaluation } from '@appointment/models/Evaluation';
import { map } from 'rxjs/operators';

@Injectable({providedIn: 'root'})
export class EvaluationService {
    private endpoint = '/evaluation';

    constructor(private httpClient: HttpClient) { }

    save(evaluation: Evaluation): Observable<Evaluation> {
        return this.httpClient.post<Evaluation>(this.endpoint, evaluation);
    }


    findByAppointmentId(id: string): Observable<Evaluation> {
        return this.httpClient.get<Array<Evaluation>>(`${this.endpoint}/appointment/${id}`)
        .pipe(map(res => res && res.length > 0 ? res[0]: null));
    }

}