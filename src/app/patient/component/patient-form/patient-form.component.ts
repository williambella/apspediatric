import { Component, OnInit } from '@angular/core';
import { Patient } from '@responsible/models/patient';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription, Observable } from 'rxjs';
import { PatientService } from '@responsible/services/patient.service';
import { ActivatedRoute, Router } from '@angular/router';
import { MessagesService } from '@core/services/messages.service';
import { CanDeactiveAbstract } from '@core/abstracts/can-deactive-abstract';

@Component({
  selector: 'app-patient-form',
  templateUrl: './patient-form.component.html',
  styleUrls: ['./patient-form.component.css']
})
export class PatientFormComponent extends CanDeactiveAbstract implements OnInit {

  formGroup: FormGroup;
  patient: Patient;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(
      private formBuilder: FormBuilder,
      private patientService: PatientService,
      private route: ActivatedRoute,
      private router: Router,
      public messageService: MessagesService
  ) {  
      super();
      this.formGroup = this.formBuilder.group({
        name: [null, Validators.compose([Validators.required])],
        id: [null, Validators.compose([Validators.required])],
        responsibleId: [null, Validators.compose([Validators.required])],
        birth: [null, Validators.compose([Validators.required])]
  });

  }

  ngOnInit() { 
      const routeSubscription: Subscription = this.route.data.subscribe((data: any) => {
          if (data && data.group) {
            this.patient = data.group as Patient;
           
            this.formGroup.get('id').setValue(this.patient.id);
            this.formGroup.get('responsibleId').setValue(this.patient.responsibleId);
            this.formGroup.get('name').setValue(this.patient.name);
            this.formGroup.get('birth').setValue(this.patient.birth);
          }
        });
    
        this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  canDeactivate(): Observable<boolean> | boolean  {
    return super.canDeactivate(this.formGroup.dirty);
  }

  formSubmit(): void {
  
    if (this.formGroup) {
      const localPatient: Patient = {
        name: this.formGroup.get('name').value,
        id: this.formGroup.get('id').value,
        responsibleId: this.formGroup.get('responsibleId').value,
        birth: this.formGroup.get('birth').value,
      };

      const formSubmitSubscription: Subscription = this.patientService.save(localPatient)
      .subscribe((patient: Patient) => {
        this.formGroup.markAsPristine();
        this.router.navigate([`./${patient.id}/edit`], {relativeTo: this.route.parent});
        this.messageService.message('form.updated');
        this.router.navigate([`patient/`]);
      });

      this.arraySubscriptions = [...this.arraySubscriptions, formSubmitSubscription];
    }
  }

} 
