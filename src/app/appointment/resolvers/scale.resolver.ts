import { ProcedureService } from './../services/procedure.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Procedure } from '@appointment/models/Procedure';
import { Scale } from '@appointment/models/Scale';
import { ScaleService } from '@appointment/services/scale.service';

@Injectable()
export class ScaleResolver implements Resolve<Observable<Scale>> {
  constructor(private scaleService: ScaleService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Scale> {
    return this.scaleService.findById(route.params.id);
  }
}