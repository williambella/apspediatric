import { Question } from './../../../models/question';
import { Component, OnInit, OnDestroy, ErrorHandler } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Subscription, of } from 'rxjs';
import { Group } from '@appointment/models/group';
import { catchError, mergeMap } from 'rxjs/operators';
import { QuestiontService } from '@appointment/services/question.service';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.scss']
})
export class GroupListComponent implements OnInit, OnDestroy {

  group: Group;
  questions: Array<Question>;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private questionService: QuestiontService
  ) { }

  ngOnInit() {
    const routeSubscription: Subscription = this.activatedRoute.data.subscribe((data: any) => {
      if (data && data.group) {
        this.group = data.group as Group;
        this.findQuestions();
      }
    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  private findQuestions(): void {
    const findQuestionsSubscription: Subscription = this.questionService.findAllByGroupId(this.group.id)
    .subscribe((questions: Array<Question>) => {
      this.questions = questions;
    });

    this.arraySubscriptions = [...this.arraySubscriptions, findQuestionsSubscription];
  }

}
