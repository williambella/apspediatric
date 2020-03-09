import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-survey-form',
  templateUrl: './survey-form.component.html',
  styleUrls: ['./survey-form.component.scss']
})
export class SurveyFormComponent implements OnInit {
  isLinear = true;
  formResponsible: FormGroup;
  formQuestion: FormGroup;

  constructor(private formBuilder: FormBuilder) {
    // this.firstFormGroup = this.formBuilder.group({
    //   firstCtrl: [null, Validators.required]
    // });
    // this.secondFormGroup = this.formBuilder.group({
    //   secondCtrl: [null, Validators.required]
    // });
  }

  ngOnInit() {
  }

}
