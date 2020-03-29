import { Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges } from '@angular/core';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DialogConfirmAction, DialogService } from '@core/services/dialog.service';
import { Contact } from '@responsible/models/contact';
import { Subscription } from 'rxjs';
import { ContactsType } from '../../../../responsible/models/contacts-type';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styles: []
})
export class ContactsComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formGroup: FormGroup;
  @Input() contacts: Array<Contact>;

  contactsType: Array<ContactsType>  = [
    {
      type: 'T',
      label: 'responsible.contacts.contacts.p'
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

      if (changes && changes.contacts.currentValue) {
        (changes.contacts.currentValue as Array<Contact>).map((contact: Contact) => this.addContact(contact));
      } else {
        this.addContact();
      }
    }
  }

  addContact(contact?: Contact): void {
    this.formContactArray.push(this.formBuilder.group({
      id: [contact ? contact.id : null],
      responsibleId: [contact ? contact.responsibleId : null],
      type: [contact ? contact.type : null, Validators.compose([Validators.required])],
      contact: [contact ? contact.contact : null, Validators.compose([Validators.required, Validators.maxLength(100)])]
    }));
  }

  removeContact(index: number): void {
    this.dialogService.confirm()
    .then((confirm: DialogConfirmAction) => {
      if (confirm.value) {
        this.formContactArray.removeAt(index);
      }
    });
  }

  get formContactArray(): FormArray {
    return this.formGroup.get(this.formArrayName) as FormArray;
  }

  get getFormArrayName(): string {
    return this.formArrayName;
  }

}
