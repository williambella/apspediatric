import { Component, OnInit, OnDestroy } from '@angular/core';
import { SurveyService } from '@survey/services/survey.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-survey',
  templateUrl: './survey.component.html',
  styleUrls: ['./survey.component.scss']
})
export class SurveyComponent implements OnInit, OnDestroy {
  arraySubscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(private surveyService: SurveyService) { }

  ngOnInit() {
    this.surveyService
    .onSurveyFinish()
    .subscribe(alo => {
      console.log('pesquisa concluida');
      console.log(this.surveyService.getFormList());
    })
  }

  ngOnDestroy() {

  }

}
