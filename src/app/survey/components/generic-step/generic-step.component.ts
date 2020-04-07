import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { Group } from '@appointment/models/group';
import { Question } from '@appointment/models/question';
import { Type } from '@appointment/models/type';
import { QuestiontService } from '@appointment/services/question.service';
import { Observable, Subscription } from 'rxjs';

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

  constructor(
    private questiontService: QuestiontService
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

  viewForm() {

  }

}
