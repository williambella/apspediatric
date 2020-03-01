import { GroupService } from './../services/group.service';
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Group } from '../models/group';

@Injectable()
export class GroupResolver implements Resolve<Observable<Group>> {
  constructor(private groupService: GroupService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Group> {
    return this.groupService.findById(route.params.id);
  }
}
