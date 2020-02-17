import { ActivatedRoute, Router } from '@angular/router';
import { Question } from '../../../models/question';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent implements OnInit {

  question: Question;

  constructor(
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      if (data && data.question) {
        this.question = data.appointment;
      }
    });
  }

}
