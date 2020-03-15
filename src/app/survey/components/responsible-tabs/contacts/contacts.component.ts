import { ContactsType } from './../../../../responsible/models/contacts-type';
import { Component, OnInit, Input, Output, EventEmitter, OnDestroy, SimpleChanges, OnChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { Contact } from '@responsible/models/contact';
import { DialogService, DialogConfirmAction } from '@core/services/dialog.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styles: []
})
export class ContactsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formGroup: FormGroup;
  @Output() tabChange: EventEmitter<number> = new EventEmitter<number>();
  @Output() saveAll: EventEmitter<any> = new EventEmitter<any>();

  contacts: Array<Contact>;

  contactsType: Array<ContactsType>  = [
    {
      type: 'T',
      label: 'responsible.contacts.contacts.t'
    },
    {
      type: 'E',
      label: 'responsible.contacts.contacts.e'
    },
    {
      type: 'W',
      label: 'responsible.contacts.contacts.w'
    }
  ];

  private readonly formArrayName = 'contacts';

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private formBuilder: FormBuilder,
    private dialogService: DialogService,
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.formGroup.currentValue) {
      this.formGroup.addControl(this.formArrayName, new FormArray([]));

      this.addContact();
    }
  }

  addContact(): void {
    this.formPatientArray.push(this.formBuilder.group({
      responsilbleId: [null],
      type: [null, Validators.compose([Validators.required])],
      contact: [null, Validators.compose([Validators.required, Validators.maxLength(100)])]
    }));
  }

  removeContact(index: number): void {
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
