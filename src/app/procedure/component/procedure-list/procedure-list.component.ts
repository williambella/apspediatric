import { Component, OnInit, OnDestroy } from '@angular/core';
import { Procedure } from '@appointment/models/Procedure';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { DialogService, DialogConfirmAction } from '@core/services/dialog.service';
import { MessagesService } from '@core/services/messages.service';
import { ProcedureService } from '@appointment/services/procedure.service';

@Component({
  selector: 'app-procedure-list',
  templateUrl: './procedure-list.component.html',
  styleUrls: ['./procedure-list.component.css']
})
export class ProcedureListComponent implements OnInit, OnDestroy {

  procedures: Array<Procedure>;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private procedureService: ProcedureService, 
    private dialogService: DialogService,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  private findAll(): void {
    const routeSubscription: Subscription = this.procedureService.getAll()
    .subscribe((procedures: Array<Procedure>) => {
      this.procedures = procedures;
    }); 

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  edit(procedure: Procedure): void {
    this.router.navigate([`./${procedure.id}/edit`], {relativeTo: this.activatedRoute});
  }

  delete(procedure: Procedure): void {
    
    this.dialogService.confirm()
    .then((confirm: DialogConfirmAction) => {
      if (confirm.value) {
        
        const deleteSubscription: Subscription = this.procedureService.delete(procedure.id)
        .subscribe((procedures: Array<Procedure>) => {
          this.messageService.message('form.removed');
          this.findAll();
        });

        this.arraySubscriptions = [...this.arraySubscriptions, deleteSubscription];
      }
    });
  }

}
