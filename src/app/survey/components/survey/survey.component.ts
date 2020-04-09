import { Component, OnInit, OnDestroy } from '@angular/core';
import { SurveyService } from '@survey/services/survey.service';
import { Subscription, of, forkJoin } from 'rxjs';
import { mergeMap } from 'rxjs/operators';
import { Patient } from '@responsible/models/patient';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  subArray = new Array<Subscription>();
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    const finishSurveySub = this.surveyService
      .onSurveyFinish()
      .subscribe(() => {

        const savePatientSub = this.surveyService
          .savePatientForm()
          .pipe(mergeMap(({ patients }: { patients: Array<Patient> }) => {

            return forkJoin(this.saveSurveyList$(patients));
          }))
          .subscribe((results: Array<any>) => {

            console.log(results);
            // TODO: Mudar de tela
            // TODO: botar mensagem de sucesso

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
