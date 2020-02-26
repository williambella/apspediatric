import { GroupService } from '@appointment/services/group.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { Group } from '@appointment/models/group';
import { TableHeader } from 'src/app/helpers/table/table.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {

  groups: Array<Group>;

  headers: Array<TableHeader> = [
    {
      title: 'group.form.group',
      field: 'group'
    },
    {
      title: 'form.order',
      field: 'order'
    }
  ];

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService
  ) { }

  ngOnInit() {
    const routeSubscription: Subscription = this.groupService.findAll()
    .subscribe((groups: Array<Group>) => {
      this.groups = groups;
    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }
}
