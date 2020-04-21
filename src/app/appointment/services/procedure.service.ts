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

}