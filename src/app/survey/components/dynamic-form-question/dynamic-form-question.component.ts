import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '@appointment/models/question';


@Component({
    selector: 'app-question',
    templateUrl: './dynamic-form-question.component.html',
    styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent {
    @Input() question: Question;
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.question.id].valid; }
}