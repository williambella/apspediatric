import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { Question } from '../models/question';
import { QuestiontService } from '../services/question.service';

@Injectable()
export class QuestionResolver implements Resolve<Observable<Question>> {
  constructor(private questionService: QuestiontService) {}

  resolve(route: ActivatedRouteSnapshot): Observable<Question> {
    if (route.params.id) {
      return this.questionService.findById(route.params.id);
    }
  }
}
