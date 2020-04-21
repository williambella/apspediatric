import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scale } from '@appointment/models/Scale';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ScaleService {
    private endpoint = '/scale';

    constructor(private httpClient: HttpClient) { }

    findAll(): Observable<Array<Scale>> {
        return this.httpClient.get<Array<Scale>>(this.endpoint);
    }

}