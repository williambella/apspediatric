import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { CanDeactiveAbstract } from '@core/abstracts/can-deactive-abstract';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Treatment } from '@appointment/models/Treatment';
import { Subscription } from 'rxjs';
import { TreatmentService } from '@appointment/services/treatment.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguagesService } from '@core/services/languages.service';
import { MessagesService } from '@core/services/messages.service';
import { Tooth } from '@appointment/models/Tooth';
import { ToothService } from '@appointment/services/tooth.service';
import { take, map } from 'rxjs/operators';

@Component({
  selector: 'app-treatment-form',
  templateUrl: './treatment-form.component.html',
  styleUrls: ['./treatment-form.component.css']
})
export class TreatmentFormComponent extends CanDeactiveAbstract implements OnInit {

  formGroup: FormGroup;
  treatment: Treatment;
  teeth: Array<Tooth>;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(
      private formBuilder: FormBuilder,
      private treatmentService: TreatmentService,
      private toothService: ToothService,
      private route: ActivatedRoute,
      private router: Router,
      public messageService: MessagesService
  ) { 
      super();
      this.formGroup = this.formBuilder.group({
      description: [null, Validators.compose([Validators.required])],
      id: [null, Validators.compose([Validators.required])],
      teeth: [null, Validators.compose([Validators.required])]
  });

  }

  ngOnInit() {
    const routeSubscription: Subscription = this.route.data.subscribe((data: any) => {

     this.toothService
            .getAll()
            .pipe(
                take(1),
                map(teeth => teeth.sort((tooth1, tooth2) => tooth1.number - tooth2.number)))
            .subscribe(teeth => this.teeth = teeth);


      if (data && data.group) {
        this.treatment = data.group as Treatment;
       
        this.formGroup.get('id').setValue(this.treatment.id);
        this.formGroup.get('description').setValue(this.treatment.description);
        this.formGroup.get('teeth').setValue(this.treatment.toothNumber);
      }

    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

formSubmit(): void {
  if (this.formGroup) {
    const localTreatment: Treatment = {
      description: this.formGroup.get('description').value,
      id: this.formGroup.get('id').value,
      toothNumber: this.formGroup.get('teeth').value
    };
    
    const formSubmitSubscription: Subscription = this.treatmentService.save(localTreatment)
    .subscribe((treatment: Treatment) => {
      this.formGroup.markAsPristine();
      this.router.navigate([`./${treatment.id}/edit`], {relativeTo: this.route.parent});
      this.messageService.message('form.updated');
      this.router.navigate([`treatment/`]);
    });

    this.arraySubscriptions = [...this.arraySubscriptions, formSubmitSubscription];
  }
}

}
