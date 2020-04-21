import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
    private endpoint = '/appointment';

    constructor(private httpClient: HttpClient) { }

    getByPatientId(patientId: string): Observable<Array<any>> {
        return this.httpClient.get<Array<any>>(`${this.endpoint}/patient/${patientId}`);
    }

}