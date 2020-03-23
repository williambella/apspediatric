import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-stepper',
  templateUrl: './survey-stepper.component.html',
  styleUrls: ['./survey-stepper.component.scss']
})
export class SurveyStepperComponent implements OnInit {
  isLinear = true;
  formGroupResponsible: FormGroup;
  formGroupQuestions: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    this.formGroupResponsible = this.formBuilder.group({});
    this.formGroupQuestions = this.formBuilder.group({});
  }

  ngOnInit() {
  }

}
