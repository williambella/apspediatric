import { Router, ActivatedRoute } from '@angular/router';
import { DialogService, DialogConfirmAction } from '@core/services/dialog.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { GroupService } from '@appointment/services/group.service';
import { Group } from '@appointment/models/group';
import { Subscription } from 'rxjs';
import { MessagesService } from '@core/services/messages.service';

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
    private dialogService: DialogService,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  questions(group: Group): void {
    this.router.navigate([`./${group.id}/questions`], {relativeTo: this.activatedRoute});
  }

  edit(group: Group): void {
    this.router.navigate([`./${group.id}/edit`], {relativeTo: this.activatedRoute});
  }

  delete(group: Group): void {
    this.dialogService.confirm()
    .then((confirm: DialogConfirmAction) => {
      if (confirm.value) {
        const deleteSubscription: Subscription = this.groupService.delete(group.id)
        .subscribe((groups: Array<Group>) => {
          this.messageService.message('form.removed');
          this.findAll();
        });

        this.arraySubscriptions = [...this.arraySubscriptions, deleteSubscription];
      }
    });
  }

  private findAll(): void {
    const routeSubscription: Subscription = this.groupService.findAll()
    .subscribe((groups: Array<Group>) => {
      this.groups = groups;
    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }
}
