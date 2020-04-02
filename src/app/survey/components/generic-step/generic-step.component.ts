import { Component, OnInit, Input } from '@angular/core';
import { Question } from '@appointment/models/question';
import { Observable } from 'rxjs';
import { QuestionBase } from '@survey/models/question-base';
import { QuestionService } from '@survey/services/question.service';

@Component({
  selector: 'app-generic-step',
  templateUrl: './generic-step.component.html',
  styleUrls: ['./generic-step.component.scss']
})
export class GenericStepComponent implements OnInit {
  @Input() questions: Array<Question> = new Array;
  questions$: Observable<QuestionBase<any>[]>;

  constructor(private questionService: QuestionService) { }

  ngOnInit() {
    this.questions$ = this.questionService.getQuestions();
    console.log(this.questions);
  }

}
