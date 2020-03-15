import { ContactService } from './../../../responsible/services/contact.service';
import { Component, OnInit, Input, ViewChild, OnDestroy } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';
import { ResponsibleComponent } from '@survey/components/responsible-tabs/responsible/responsible.component';
import { PatientComponent } from '@survey/components//responsible-tabs/patient/patient.component';
import { ContactsComponent } from '@survey/components/responsible-tabs/contacts/contacts.component';
import { Responsible } from '@responsible/models/responsible';
import { ResponsibleService } from '@responsible/services/responsible.service';
import { MessagesService } from '@core/services/messages.service';
import { Subscription, Observable, forkJoin } from 'rxjs';
import { PatientService } from '@responsible/services/patient.service';
import { Patient } from '@responsible/models/patient';
import { Contact } from '@responsible/models/contact';

@Component({
  selector: 'app-responsible-tabs',
  templateUrl: './responsible-tabs.component.html',
  styles: []
})
export class ResponsibleTabsComponent implements OnInit, OnDestroy {
  @ViewChild('matTabGroup', {static: false }) matTabGroup: MatTabGroup;
  @ViewChild('appResponsible', {static: false}) appResponsible: ResponsibleComponent;
  @ViewChild('appPatient', { static: false }) appPatient: PatientComponent;
  @ViewChild('appContact', { static: false }) appContact: ContactsComponent;

  @Input() formGroup: FormGroup;

  responsible: Responsible;
  patients: Array<Patient>;
  contacts: Array<Contact>;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private responsibleService: ResponsibleService,
    private patientService: PatientService,
    private contactService: ContactService,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  selectTabChange(selectedIndex: number): void {
    this.matTabGroup.selectedIndex = selectedIndex;
  }

  formSubmit(): void {
    if (this.formGroup.valid) {
      const responsible: Responsible = this.formGroup.get(this.appResponsible.getFormGroupName).value;

      if (this.responsible) {
        responsible.id = this.responsible.id;
      }

      const formSubmitSubscription: Subscription =  this.responsibleService.save(responsible)
      .subscribe((data: Responsible) => {
        this.responsible = data;

        forkJoin([this.savePatients(), this.saveContacts()]).subscribe((results: Array<any>) => {
          this.patients = results[0] as Array<Patient>;
          this.contacts = results[1] as Array<Contact>;

          this.messageService.message('form.updated');
        });
      });

      this.arraySubscriptions = [...this.arraySubscriptions, formSubmitSubscription];
    }
  }

  savePatients(): Observable<Array<Patient>> {
    const patients: Array<Patient> = ((this.formGroup.get(this.appPatient.getFormArrayName).value) as Array<Patient>)
    .map((patient: Patient) => {
      patient.responsilbleId = this.responsible.id;
      return patient;
    });

    return this.patientService.saveAll(patients);
  }

  saveContacts(): Observable<Array<Contact>> {
    const contacts: Array<Contact> = ((this.formGroup.get(this.appContact.getFormArrayName).value) as Array<Contact>)
    .map((contact: Contact) => {
      contact.responsilbleId = this.responsible.id;
      return contact;
    });

    return this.contactService.saveAll(contacts);
  }

}
