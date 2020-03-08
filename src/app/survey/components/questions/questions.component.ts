import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { GroupService } from '@appointment/services/group.service';
import { QuestiontService } from '@appointment/services/question.service';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit {
  @Input() formGroup: FormGroup;

  constructor(
    private groupService: GroupService,
    private questiontService: QuestiontService,
    private formBuilder: FormBuilder
  ) { }

  ngOnInit() {
  }

}
