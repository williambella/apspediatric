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

}