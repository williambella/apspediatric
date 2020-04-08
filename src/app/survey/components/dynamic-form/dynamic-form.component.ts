import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Question } from '@appointment/models/question';
import { Type } from '@appointment/models/type';
import { QuestionControlService } from '@survey/services/question-control.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

@Component({
    selector: 'app-dynamic-form',
    templateUrl: './dynamic-form.component.html',
    styleUrls: ['./dynamic-form.component.scss'],
    providers: [QuestionControlService]
})
export class DynamicFormComponent implements OnInit, OnDestroy {

    destroy$: Subject<boolean> = new Subject<boolean>();
    @Input() questions: Array<Question> = [];
    @Input() types: Array<Type> = [];
    form: FormGroup;
    payLoad = '';
    showForm = true;
    @Input() onFormValid: Function

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

            this.form.statusChanges
                .pipe(takeUntil(this.destroy$))
                .subscribe(() => {
                    this.onFormValid(this.form);
                });

        } else {
            this.showForm = false;
        }

    }

    onSubmit() {
        this.payLoad = JSON.stringify(this.form.getRawValue());
    }

    ngOnDestroy() {
        this.destroy$.next(true);
        this.destroy$.unsubscribe();
    }
}