import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '@appointment/models/question';
import { Type } from '@appointment/models/type';
import { QuestionControlService } from '@survey/services/question-control.service';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit {

    @Input() questions: Array<Question> = [];
    @Input() types: Array<Type> = [];
    form: FormGroup;
    payLoad = '';
    showForm = true;

    constructor(private qcs: QuestionControlService) { }

    ngOnInit() {
        if (!!this.questions) {
            this.form = this.qcs.toFormGroup(this.questions);

            this.questions = this.questions
                .map(question => ({
                    ...question, controlType: this.types
                        .find(type => type.id === question.idType).abbrev.toLowerCase(),
                    options: question.options
                        ? Object.keys(question.options)
                            .map(key => ({ value: question.options[key] }))
                        : []
                }));

        } else {
            this.showForm = false;
        }
    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.getRawValue());
    }
}