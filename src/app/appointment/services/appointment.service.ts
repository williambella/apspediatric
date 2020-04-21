import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Appointment } from '@appointment/models/Appointment';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
    private endpoint = '/appointment';

    constructor(private httpClient: HttpClient) { }

    getByPatientId(patientId: string): Observable<Array<Appointment>> {
        return this.httpClient.get<Array<Appointment>>(`${this.endpoint}/patient/${patientId}`);
    }

}