import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { QuestiontService } from '@appointment/services/question.service';
import { Group } from '@appointment/models/group';
import { Question } from '@appointment/models/question';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'app-question-list',
  templateUrl: './question-list.component.html',
  styleUrls: ['./question-list.component.scss']
})
export class QuestionListComponent implements OnInit, OnDestroy {

  group: Group;
  questions: Array<Question>;

  data: PeriodicElement[] = [
    {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
    {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
    {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
    {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
    {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
    {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
    {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
    {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
    {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
    {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  ];

  columns: Array<string> = ['radio', 'position', 'name', 'weight', 'symbol', 'actions', 'star'];

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private activatedRoute: ActivatedRoute,
    private router: Router,
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

  edit(question: Question): void {
    this.router.navigate([`./${question.id}`], {relativeTo: this.activatedRoute});
  }

  delete(data: PeriodicElement): void {
    console.log(data);
  }

  toggle(data: PeriodicElement): void {
    console.log(data);
  }

  private findQuestions(): void {
    const findQuestionsSubscription: Subscription = this.questionService.findAllByGroupId(this.group.id)
    .subscribe((questions: Array<Question>) => {
      this.questions = questions;
    });

    this.arraySubscriptions = [...this.arraySubscriptions, findQuestionsSubscription];
  }

}
