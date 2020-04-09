import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Answer } from '@survey/models/Answer';
import { Observable, Subject, forkJoin, of } from 'rxjs';
import { ResponsibleService } from '@responsible/services/responsible.service';
import { PatientService } from '@responsible/services/patient.service';
import { ContactService } from '@responsible/services/contact.service';
import { FormGroup } from '@angular/forms';
import { Responsible } from '@responsible/models/responsible';
import { mergeMap } from 'rxjs/operators';
import { Patient } from '@responsible/models/patient';
import { Contact } from '@responsible/models/contact';

@Injectable({
  providedIn: 'root'
})
export class SurveyService {

  private endpoint = '/response';
  private responses: Array<Answer> = [];
  private finishSubject = new Subject<boolean>();
  private form: FormGroup;

  constructor(
    private httpClient: HttpClient,
    private responsibleService: ResponsibleService,
    private patientService: PatientService,
    private contactService: ContactService,
  ) { }

  /**
   * Save Responses
   *
   * @param questions: Array<Answer>
   * @returns Observable<Group>
   */
  save(questions: Array<Answer>): Observable<Array<any>> {
    return this.httpClient.post<Array<any>>(`${this.endpoint}`, questions);
  }

  setResponses(questionWithResponses: Array<Answer>) {
    this.responses.push(...questionWithResponses);
  }

  getResponses(): Array<Answer> {
    return this.responses;
  }

  onSurveyFinish(): Observable<boolean> {
    return this.finishSubject;
  }

  finishSurvey(): void {
    return this.finishSubject.next();
  }

  setPatientForm(form: FormGroup): void {
    this.form = form;
  }

  savePatientForm(): Observable<any> {
    const values = this.form.value;

    return this.responsibleService
      .save(values.responsible)
      .pipe(
        mergeMap((responsible: Responsible) =>

          forkJoin([this.savePatients(responsible), this.saveContacts(responsible)])
            .pipe(mergeMap((results: Array<any>) =>
              of({ responsible: responsible, patients: results[0], contacts: results[1] })
            ))
        )
      )
  }

  savePatients(responsible: Responsible): Observable<Array<Patient>> {
    const patients: Array<Patient> = ((this.form.value.patients) as Array<Patient>)
      .map((patient: Patient) => {
        patient.responsibleId = responsible.id;
        return patient;
      });

    return this.patientService.saveAll(patients);
  }

  saveContacts(responsible: Responsible): Observable<Array<Contact>> {
    const contacts: Array<Contact> = ((this.form.value.contacts) as Array<Contact>)
      .map((contact: Contact) => {
        contact.responsibleId = responsible.id;
        return contact;
      });

    return this.contactService.saveAll(contacts);
  }
}
