import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Patient } from '@responsible/models/patient';
import { PatientService } from '@responsible/services/patient.service';

@Injectable()
export class PatientResolver implements Resolve<Observable<Patient>> {
  constructor(private patientService: PatientService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Patient> {
    return this.patientService.findById(route.params.id);
  }
}