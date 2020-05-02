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

  findById(id: string): Observable<Patient> {
    return this.httpClient.get<Patient>(`${this.endpoint}/${id}`);
  }

  delete(id: string): Observable<Array<Patient>> {
    return this.httpClient.delete<Array<Patient>>(`${this.endpoint}/${id}`);
  }

  save(patient: Patient): Observable<Patient> {
    if (patient.id) {
      return this.httpClient.put<Patient>(`${this.endpoint}/${patient.id}`, patient);
    } else {
      return this.httpClient.post<Patient>(`${this.endpoint}`, patient);
    }
  }
}
