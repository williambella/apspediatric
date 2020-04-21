import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Tooth } from '@appointment/models/Tooth';

@Injectable({ providedIn: 'root' })
export class ToothService {
    private endpoint = '/tooth';

    constructor(private httpClient: HttpClient) { }

    getAll(): Observable<Array<Tooth>> {
        return this.httpClient.get<Array<Tooth>>(`${this.endpoint}`);
    }

}