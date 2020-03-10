import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
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
