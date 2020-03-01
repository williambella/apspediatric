import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestiontService } from '@appointment/services/question.service';
import { Group } from '@appointment/models/group';
import { Question } from '@appointment/models/question';
import { DialogService, DialogConfirmSettings, DialogConfirmAction } from '@core/services/dialog.service';
import { MessagesService } from '@core/services/messages.service';

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  group: Group;
  questions: Array<Question>;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private questionService: QuestiontService,
    private dialogService: DialogService,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    const routeSubscription: Subscription = this.activatedRoute.data.subscribe((data: any) => {
      if (data && data.group) {
        this.group = data.group as Group;

        this.findAll();
      }
    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  edit(question: Question): void {
    this.router.navigate([`./${question.id}`], {relativeTo: this.activatedRoute});
  }

  delete(question: Question): void {
    const dialogConfirmSettings: DialogConfirmSettings = {
    };

    this.dialogService.confirm(dialogConfirmSettings)
    .then((confirm: DialogConfirmAction) => {
      if (confirm.value) {
        const deleteSubscription: Subscription = this.questionService.delete(question.id)
        .subscribe(() => {
          this.messageService.message('form.removed');

          this.findAll();
        });

        this.arraySubscriptions = [...this.arraySubscriptions, deleteSubscription];
      }
    });
  }

  toggle(question: Question): void {
    console.log(question);
  }

  private findAll(): void {
    const findQuestionsSubscription: Subscription = this.questionService.findAllByGroupId(this.group.id)
    .subscribe((questions: Array<Question>) => {
      this.questions = questions;
    });

    this.arraySubscriptions = [...this.arraySubscriptions, findQuestionsSubscription];
  }

}
