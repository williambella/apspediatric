import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Treatment } from '@appointment/models/Treatment';
import { Tooth } from '@appointment/models/Tooth';
import { Subscription } from 'rxjs';
import { TreatmentService } from '@appointment/services/treatment.service';
import { ToothService } from '@appointment/services/tooth.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguagesService } from '@core/services/languages.service';
import { MessagesService } from '@core/services/messages.service';
import { take, map } from 'rxjs/operators';
import { DialogConfirmAction, DialogService } from '@core/services/dialog.service';

@Component({
  selector: 'app-treatment-list',
  templateUrl: './treatment-list.component.html',
  styleUrls: ['./treatment-list.component.css']
})
export class TreatmentListComponent implements OnInit {

  formGroup: FormGroup;
  treatments:  Array<Treatment>;
  teeth: Array<Tooth>;
  treatmentList: Array<Treatment>;
  formArrayName = 'treatments';

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(
      private formBuilder: FormBuilder,
      private treatmentService: TreatmentService,
      private toothService: ToothService,
      private route: ActivatedRoute,
      private router: Router,
      private dialogService: DialogService,
      public messageService: MessagesService
  ) { 
      
      this.formGroup = this.formBuilder.group({
      description: [null, Validators.compose([Validators.required])],
      id: [null, Validators.compose([Validators.required])]
  });

  }

  ngOnInit() {
    this.findAll();
  }

  private newTreatment(): any {
    return this.formBuilder.group({
        treatment: ['', Validators.required],
        teeth: ['', Validators.required]
    });
}

get treatmentFormArray() {
    return this.formGroup.get(this.formArrayName) as FormArray;
}

removeTreatment(index: number) {
    this.treatmentFormArray.removeAt(index);
}

addTreatment() {
    this.treatmentFormArray.push(this.newTreatment());
}

private findAll(): void {
    const routeSubscription: Subscription = this.treatmentService.getAll()
    .subscribe((treatment: Array<Treatment>) => {
      this.treatments = treatment;
    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
}

edit(treatment: Treatment): void {
  this.router.navigate([`./${treatment.id}/edit`], {relativeTo: this.route});
}

delete(treatment: Treatment): void {
    
  this.dialogService.confirm()
  .then((confirm: DialogConfirmAction) => {
    if (confirm.value) {
      
      const deleteSubscription: Subscription = this.treatmentService.delete(treatment.id)
      .subscribe((treatments: Array<Treatment>) => {
        this.messageService.message('form.removed');
        this.findAll();
      });

      this.arraySubscriptions = [...this.arraySubscriptions, deleteSubscription];
    }
  });
}

}
