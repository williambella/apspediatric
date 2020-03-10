
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl, FormArray } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Patient } from '@responsible/models/patient';

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styles: []
})
export class PatientComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formGroup: FormGroup;
  patients: Array<Patient>;

  private readonly formArrayName = 'patients';

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.formGroup.currentValue) {
      this.formGroup.addControl(this.formArrayName, new FormArray([]));

      this.addPatient();
    }
  }

  addPatient(): void {
    this.formPatientArray.push(this.formBuilder.group({
      name: [null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      birth: [null, Validators.compose([Validators.required])]
    }));
  }

  get formPatientArray(): FormArray {
    return this.formGroup.get(this.formArrayName) as FormArray;
  }

}
