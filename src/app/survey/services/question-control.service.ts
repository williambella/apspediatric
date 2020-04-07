import { Injectable } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Question } from '@appointment/models/question';


@Injectable()
export class QuestionControlService {
    constructor() { }

    toFormGroup(questions: Array<Question>) {
        let group: any = {};

        questions
        .forEach(question => group[question.id] = new FormControl('', Validators.required));
        return new FormGroup(group);
    }
}