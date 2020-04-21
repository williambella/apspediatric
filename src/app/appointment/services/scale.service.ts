import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Scale } from '@appointment/models/Scale';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ScaleService {
    private endpoint = '/scale';

    constructor(private httpClient: HttpClient) { }

    save(scale: Scale): Observable<Scale> {
        return this.httpClient.post<Scale>(this.endpoint, scale);
    }

}