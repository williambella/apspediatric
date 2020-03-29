import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Responsible } from '../../../../responsible/models/responsible';

@Component({
  selector: 'app-responsible',
  templateUrl: './responsible.component.html',
  styleUrls: ['responsible.component.scss']
})
export class ResponsibleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formGroup: FormGroup;
  @Input() responsible: Responsible;
  private readonly formArrayName = 'responsible';

  parentalDegree: Array<string> = [
    'Mother', 'Father', 'Aunty', 'Uncle', 'Grandmother', 'Grandfather', 'Other'
  ];

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
      this.formGroup.addControl(this.getFormGroupName, this.formBuilder.group(
        {
          name: ['', Validators.compose([Validators.required, Validators.max(100)])],
          parentalDegree: [null, Validators.required]
        }
      ));
    }

    if (changes && changes.responsible.currentValue) {
      this.formGroupResponsible.get('name').setValue(changes.responsible.currentValue.name);
      this.formGroupResponsible.get('parentalDegree').setValue(changes.responsible.currentValue.parentalDegree);
    }
  }

  get formGroupResponsible(): FormControl {
    return this.formGroup.get(this.getFormGroupName) as FormControl;
  }

  get getFormGroupName(): string {
    return this.formArrayName;
  }

}
