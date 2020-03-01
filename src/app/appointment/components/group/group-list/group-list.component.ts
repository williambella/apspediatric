import { DialogService, DialogConfirmSettings } from '@core/services/dialog.service';
import { GroupService } from '@appointment/services/group.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Group } from '@appointment/models/group';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {

  groups: Array<Group>;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private groupService: GroupService,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  findAll(): void {
    const routeSubscription: Subscription = this.groupService.findAll()
    .subscribe((groups: Array<Group>) => {
      this.groups = groups;
    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  };

  edit(group: Group): void {
    this.router.navigate([`./${group.id}`], {relativeTo: this.activatedRoute});
  }

  delete(group: Group): void {
    const dialogConfirmSettings: DialogConfirmSettings = {
    };

    this.dialogService.confirm(dialogConfirmSettings)
    .then(() => {
      const deleteSubscription: Subscription = this.groupService.delete(group.id)
      .subscribe((groups: Array<Group>) => {
        // TODO: Retornar a lista atualizada: this.groups = groups;
        this.findAll();
      });

      this.arraySubscriptions = [...this.arraySubscriptions, deleteSubscription];
    });
  }
}
