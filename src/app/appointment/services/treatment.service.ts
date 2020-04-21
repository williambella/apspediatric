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

}