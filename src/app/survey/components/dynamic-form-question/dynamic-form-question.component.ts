import { Component, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { QuestionBase } from '@survey/models/question-base';


@Component({
    selector: 'app-question',
    templateUrl: './dynamic-form-question.component.html',
    styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent {
    @Input() question: QuestionBase<string>;
    @Input() form: FormGroup;
    get isValid() { return this.form.controls[this.question.key].valid; }
}