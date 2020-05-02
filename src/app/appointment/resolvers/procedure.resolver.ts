import { ProcedureService } from './../services/procedure.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Procedure } from '@appointment/models/Procedure';

@Injectable()
export class ProcedureResolver implements Resolve<Observable<Procedure>> {
  constructor(private procedureService: ProcedureService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Procedure> {
    return this.procedureService.findById(route.params.id);
  }
}