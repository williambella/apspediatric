import { Component, OnInit, OnDestroy } from '@angular/core';
import { Scale } from '@appointment/models/Scale';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { ScaleService } from '@appointment/services/scale.service';
import { DialogService, DialogConfirmAction } from '@core/services/dialog.service';
import { MessagesService } from '@core/services/messages.service';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-scale-list',
  templateUrl: './scale-list.component.html',
  styleUrls: ['./scale-list.component.css']
})
export class ScaleListComponent implements OnInit, OnDestroy {

  scales: Array<Scale>;
  formGroup: FormGroup;
  arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private scaleService: ScaleService, 
    private dialogService: DialogService,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  findAll(): void {
    const routeSubscription: Subscription = this.scaleService.findAll()
    .subscribe((scale: Array<Scale>) => {
      this.scales = scale;
    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  edit(scale: Scale): void {
    this.router.navigate([`./${scale.id}/edit`], {relativeTo: this.activatedRoute});
  }

  delete(scale: Scale): void {
    
    this.dialogService.confirm()
    .then((confirm: DialogConfirmAction) => {
      if (confirm.value) {
        
        const deleteSubscription: Subscription = this.scaleService.delete(scale.id)
        .subscribe((scale: Array<Scale>) => {
          this.messageService.message('form.removed');
          this.findAll();
        });

        this.arraySubscriptions = [...this.arraySubscriptions, deleteSubscription];
      }
    });
  }

}
