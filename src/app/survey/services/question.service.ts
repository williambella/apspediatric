import { Injectable }       from '@angular/core';

import { of } from 'rxjs';
import { DropdownQuestion } from '@survey/models/question-dropdown';
import { QuestionBase } from '@survey/models/question-base';
import { TextboxQuestion } from '@survey/models/question-textbox';

@Injectable()
export class QuestionService {

  getQuestions() {

    let questions: QuestionBase<string>[] = [

      new DropdownQuestion({
        key: 'afraid',
        label: 'What is your child afraid of?',
        options: [
          {key: 'cockroach',  value: 'Cockroach'},
          {key: 'blood',  value: 'Blood'},
          {key: 'needle',   value: 'Needle'}
        ],
        order: 3
      }),

      new TextboxQuestion({
        key: 'preference',
        label: 'What are your child preferences?',
        required: true,
        order: 1
      }),

      new TextboxQuestion({
        key: 'activities',
        label: 'Activities during free time like sports, TV shows, movies:',
        order: 2
      }),

      new DropdownQuestion({
        key: 'activities',
        label: 'Activities during free time like sports, TV shows, movies:',
        options: [
          {key: 'cockroach',  value: 'Cockroach'},
          {key: 'blood',  value: 'Blood'},
          {key: 'needle',   value: 'Needle'}
        ],
        controlType: 'radio',
        order: 4
      })
    ];

    return of(questions.sort((a, b) => a.order - b.order));
  }
}