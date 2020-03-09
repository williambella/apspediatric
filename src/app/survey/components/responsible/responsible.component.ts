import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { Responsible } from 'src/app/responsible/models/responsible';
import { MessagesService } from '@core/services/messages.service';
import { ResponsibleService } from '@responsible/services/responsible.service';

@Component({
  selector: 'app-responsible',
  templateUrl: './responsible.component.html',
  styleUrls: []
})
export class ResponsibleComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formGroup: FormGroup;
  responsible: Responsible;

  parentalDegree: Array<string> = [
    'Mother', 'Father', 'Aunty', 'Uncle', 'Grandmother', 'Grandfather', 'Other'
  ];

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private formBuilder: FormBuilder,
    private responsibleService: ResponsibleService,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.formGroup.currentValue) {
      this.formGroup = this.formBuilder.group(
        {
          name: ['', Validators.compose([Validators.required, Validators.max(100)])],
          parentalDegree: [null, Validators.required]
        }
      );
    }
  }

  formSubmit(): void {
    if (this.formGroup.valid) {
      const localResponsible: Responsible = {
        name: this.formGroup.get('name').value,
        parentalDegree: this.formGroup.get('parentalDegree').value,
        patients: [],
        contacts: []
      };

      const formSubmitSubscription: Subscription =  this.responsibleService.save(localResponsible)
      .subscribe((responsible: Responsible) => {
        this.responsible = responsible;
        this.messageService.message('form.updated');
      });

      this.arraySubscriptions = [...this.arraySubscriptions, formSubmitSubscription];
    }
  }
}