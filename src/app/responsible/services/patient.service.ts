import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Patient } from '@responsible/models/patient';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PatientService {

  private endpoint = '/patient';

  constructor(private httpClient: HttpClient) { }

  /**
   * Save array of Patients
   *
   * @param patients: Array<Patient>
   * @returns Observable<Patient>
   */
  saveAll(patients: Array<Patient>): Observable<Array<Patient>> {
    return this.httpClient.post<Array<Patient>>(`${this.endpoint}`, patients);
  }

  findAll(): Observable<Array<Patient>> {
    return this.httpClient.get<Array<Patient>>(`${this.endpoint}`);
  }
}
