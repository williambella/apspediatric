import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { TreatmentService } from '@appointment/services/treatment.service';
import { Treatment } from '@appointment/models/Treatment';

@Injectable()
export class TreatmentResolver implements Resolve<Observable<Treatment>> {
  constructor(private treatmentService: TreatmentService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Treatment> {
    return this.treatmentService.findById(route.params.id);
  }
}