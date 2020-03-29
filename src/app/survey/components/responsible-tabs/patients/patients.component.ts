import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { DialogService, DialogConfirmAction } from '@core/services/dialog.service';
import { Patient } from '@responsible/models/patient';
import { Subscription } from 'rxjs';
import * as moment from 'moment';

@Component({
  selector: 'app-patient',
  templateUrl: './patients.component.html',
  styles: []
})
export class PatientsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formGroup: FormGroup;
  @Input() patients: Array<Patient>;

  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();

  private readonly formArrayName = 'patients';

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.formGroup.currentValue) {
      this.formGroup.addControl(this.formArrayName, new FormArray([]));

      if (changes && changes.patients.currentValue) {
        (changes.patients.currentValue as Array<Patient>).map((patient:Patient) => this.addPatient(patient));
      } else {
        this.addPatient();
      }
    }
  }

  addPatient(patient?: Patient): void {
    this.formPatientArray.push(this.formBuilder.group({
      id: [patient ? patient.id : null],
      responsilbleId: [patient ? patient.responsibleId : null],
      name: [patient ? patient.name : null, Validators.compose([Validators.required, Validators.maxLength(100)])],
      birth: [patient ? moment(patient.birth) : null, Validators.compose([Validators.required])]
    }));
  }

  removePatient(index: number): void {
    this.dialogService.confirm()
    .then((confirm: DialogConfirmAction) => {
      if (confirm.value) {
        this.formPatientArray.removeAt(index);
      }
    });
  }

  get formPatientArray(): FormArray {
    return this.formGroup.get(this.formArrayName) as FormArray;
  }

  get getFormArrayName(): string {
    return this.formArrayName;
  }

}
