import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Group } from '@appointment/models/group';
import { Question } from '@appointment/models/question';
import { Type } from '@appointment/models/type';
import { QuestiontService } from '@appointment/services/question.service';
import { Subscription } from 'rxjs';
import { SurveyService } from '@survey/services/survey.service';

@Component({
  selector: 'app-generic-step',
  templateUrl: './generic-step.component.html',
  styleUrls: ['./generic-step.component.scss']
})
export class GenericStepComponent implements OnInit, OnDestroy {
  @Input() group: Group;
  questions: Array<Question>;
  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();
  @Input() types: Array<Type>;
  isDisabled = true;
  form: FormGroup;

  constructor(
    private questiontService: QuestiontService,
    private surveyService: SurveyService
  ) { }

  ngOnInit() {
    this.arraySubscriptions
      .push(
        this.questiontService
          .findAllByGroupId(this.group.id)
          .subscribe(questions => this.questions = questions));
  }

  ngOnDestroy() {
    this.arraySubscriptions.forEach(sub => sub.unsubscribe());
  }

  goNextAndSaveForm() {
    this.surveyService.setResponses(this.getQuestionWithResponse());
  }

  private getQuestionWithResponse() {
    return this.questions.map(question => ({
      questionId: question.id,
      idGroup: question.idGroup,
      idType: question.idType,
      question: question.question,
      response: this.form.value[question.id]
    }));
  }

  finishSurvey() {
    this.surveyService.setResponses(this.getQuestionWithResponse());
    this.surveyService.finishSurvey();
  }

  doFormValid = (form: FormGroup) => {
    this.isDisabled = form.invalid;
    if (form.valid) {
      this.form = form;
    }
  }

}
