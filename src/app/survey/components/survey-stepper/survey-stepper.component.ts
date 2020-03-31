import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Group } from '@appointment/models/group';
import { GroupService } from '@appointment/services/group.service';
import { QuestiontService } from '@appointment/services/question.service';
import { forkJoin, Subscription } from 'rxjs';

@Component({
  selector: 'app-survey-stepper',
  templateUrl: './survey-stepper.component.html',
  styleUrls: ['./survey-stepper.component.scss']
})
export class SurveyStepperComponent implements OnInit, OnDestroy {
  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();
  formGroupResponsible: FormGroup;
  formGroupQuestions: FormGroup;
  groups: Array<Group>;

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private questiontService: QuestiontService,
  ) {
    this.formGroupResponsible = this.formBuilder.group({});
    this.formGroupQuestions = this.formBuilder.group({});
  }

  ngOnInit() {
    this.getGroups();
  }

  private getGroups() {
    const groupSub = this.groupService
      .findAll()
      .subscribe(groups => this.getQuestionsFromGroups(groups));
    this.arraySubscriptions.push(groupSub);
  }

  private getQuestionsFromGroups(groups: Group[]) {
    const questionSubList =
      forkJoin(groups
        .map(group => this.questiontService
          .findAllByGroupId(group.id)))
        .subscribe(questionArray => {
          const questionArrayWithoutEmpty = questionArray
            .filter(questions => questions && questions.length !== 0);
          this.groups = groups
            .filter(group => questionArrayWithoutEmpty
              .some(questions => questions[0].idGroup === group.id))
            .sort((question1, question2) => question1.order - question2.order)
            .map(group => ({
              ...group,
              questions: questionArrayWithoutEmpty
                .find(questions => group.id === questions[0].idGroup)
            }));
        });
    this.arraySubscriptions.push(questionSubList);
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
