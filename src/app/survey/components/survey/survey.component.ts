import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Patient } from '@responsible/models/patient';
import { SurveyService } from '@survey/services/survey.service';
import { forkJoin, Subscription } from 'rxjs';
import { mergeMap } from 'rxjs/operators';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  subArray = new Array<Subscription>();
  showProgressBar = false;

  constructor(
    private surveyService: SurveyService,
    private router: Router
  ) { }

  ngOnInit() {
    const finishSurveySub = this.surveyService
      .onSurveyFinish()
      .subscribe(() => {
        this.showProgressBar = true;
        const savePatientSub = this.surveyService
          .savePatientForm()
          .pipe(mergeMap(({ patients }: { patients: Array<Patient> }) => {

            return forkJoin(this.saveSurveyList$(patients));
          }))
          .subscribe(() => {
            this.showProgressBar = false;
            this.router.navigate(['survey/done']);
          });

        this.subArray.push(savePatientSub);
      });

    this.subArray.push(finishSurveySub);
  }

  private saveSurveyList$(patients: Patient[]) {
    return patients.map(patient => {
      const awnserList = this.surveyService.getResponses().map(answer => ({
        ...answer,
        patientId: patient.id
      }));
      return this.surveyService.save(awnserList);
    });
  }

  ngOnDestroy() {
    this.subArray.forEach(sub => sub.unsubscribe());
  }

}
