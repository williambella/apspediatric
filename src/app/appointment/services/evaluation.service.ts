import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Evaluation } from '@appointment/models/Evaluation';

@Injectable({providedIn: 'root'})
export class EvaluationService {
    private endpoint = '/evaluation';

    constructor(private httpClient: HttpClient) { }

    save(evaluation: Evaluation): Observable<Evaluation> {
        return this.httpClient.get<Evaluation>(this.endpoint);
    }

}