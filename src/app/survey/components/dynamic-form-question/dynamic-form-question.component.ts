import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { Question } from '@appointment/models/question';


@Component({
    selector: 'app-question',
    templateUrl: './dynamic-form-question.component.html',
    styleUrls: ['./dynamic-form-question.component.scss']
})
export class DynamicFormQuestionComponent implements OnInit {
    @Input() question: Question;
    @Input() form: FormGroup;
    showOtherInput = false;
    checkboxList = [];

    ngOnInit() {

    }

    changeValue(value: any) {
        if (typeof value !== 'string') {

            if (value.value.toLowerCase().includes('other')) {
                this.showOtherInput = true;
            } else {
                this.form.get(this.question.id).setValue(value.value);
                this.showOtherInput = false;
            }

        } else {

            this.form.get(this.question.id).setValue(value);

        }
    }

    changeCheckbox(opt: any, value: string) {
        if (value) {
            this.checkboxList.push(opt.value);
        } else {
            this.checkboxList = this.checkboxList.filter(check => check !== opt.value);
        }

        this.formatCheckboxValue();

    }

    formatCheckboxValue() {
        let checkboxValue = '';
        this.checkboxList.forEach((value, index) => {
            checkboxValue += value;
            if(index+1 < this.checkboxList.length) {
                checkboxValue += ', ';
            }
        })

        this.form.get(this.question.id).setValue(checkboxValue);
    }
}