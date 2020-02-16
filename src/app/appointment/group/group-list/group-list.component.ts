import { Component, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { Group } from '@appointment/models/group';
import { catchError, mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {

  group: Group;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private activatedRoute: ActivatedRoute
  ) { }

  ngOnInit() {
    const routeSubscription: Subscription = this.activatedRoute.data.subscribe((data: any) => {
      if (data && data.group) {
        this.group = data.group as Group;
      }
    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

}
