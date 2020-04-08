import { Component, OnDestroy, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MessagesService } from '@core/services/messages.service';
import { Contact } from '@responsible/models/contact';
import { Patient } from '@responsible/models/patient';
import { Responsible } from '@responsible/models/responsible';
import { ContactService } from '@responsible/services/contact.service';
import { PatientService } from '@responsible/services/patient.service';
import { ResponsibleService } from '@responsible/services/responsible.service';
import { ContactsComponent } from '@survey/components/responsible-step/contacts/contacts.component';
import { PatientsComponent } from '@survey/components/responsible-step/patients/patients.component';
import { ResponsibleComponent } from '@survey/components/responsible-step/responsible/responsible.component';
import { forkJoin, Observable, Subscription } from 'rxjs';
import { SurveyService } from '@survey/services/survey.service';

@Component({
  selector: 'app-responsible-step',
  templateUrl: './responsible-step.component.html',
  styles: []
})
export class ResponsibleStepComponent implements OnDestroy {
  @ViewChild('appResponsible', { static: false }) appResponsible: ResponsibleComponent;
  @ViewChild('appPatient', { static: false }) appPatient: PatientsComponent;
  @ViewChild('appContact', { static: false }) appContact: ContactsComponent;

  formGroup: FormGroup;

  responsible: Responsible;
  patients: Array<Patient>;
  contacts: Array<Contact>;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private responsibleService: ResponsibleService,
    private patientService: PatientService,
    private contactService: ContactService,
    private messageService: MessagesService,
    private formBuilder: FormBuilder,
    private surveyService: SurveyService
  ) {
    this.formGroup = this.formBuilder.group({});
  }


  ngOnDestroy(): void {
    this.arraySubscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

  goNextAndSaveForm() {
    this.surveyService.setForm(this.formGroup);
  }

  formSubmit(): void {

    if (this.formGroup.valid) {
      const responsible: Responsible = this.formGroup.get(this.appResponsible.getFormGroupName).value;

      if (this.responsible) {
        responsible.id = this.responsible.id;
      }

      const formSubmitSubscription: Subscription = this.responsibleService
        .save(responsible)
        .subscribe((data: Responsible) => {
          this.responsible = data;

          forkJoin([this.savePatients(), this.saveContacts()])
            .subscribe((results: Array<any>) => {
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
        patient.responsibleId = this.responsible.id;
        return patient;
      });

    return this.patientService.saveAll(patients);
  }

  saveContacts(): Observable<Array<Contact>> {
    const contacts: Array<Contact> = ((this.formGroup.get(this.appContact.getFormArrayName).value) as Array<Contact>)
      .map((contact: Contact) => {
        contact.responsibleId = this.responsible.id;
        return contact;
      });

    return this.contactService.saveAll(contacts);
  }

}
