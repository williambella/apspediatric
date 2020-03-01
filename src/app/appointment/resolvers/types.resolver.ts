import { Type } from './../models/type';
import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { TypeService } from '@appointment/services/type.service';
import { Observable } from 'rxjs';

@Injectable()
export class TypesResolver implements Resolve<Observable<Array<Type>>> {
  constructor(private typeService: TypeService) {}

  resolve(): Observable<Array<Type>> {
    return this.typeService.findAll();
  }
}
