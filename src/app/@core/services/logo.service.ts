import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Logo } from '@core/models/Logo';
import { Observable, of } from 'rxjs';
import { flatMap } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LogoService {
    private logo;
    private endpoint = '/logo';

    constructor(private httpClient: HttpClient) { }

    findLogo(): Observable<Logo> {
        return this.logo
            ? of(this.logo)
            : this.httpClient.get<Logo>(this.endpoint).pipe(flatMap(logo => {
                this.logo = logo;
                return of(logo);
            }));
    }
}