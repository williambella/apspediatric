import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { GroupService } from '@appointment/services/group.service';
import { QuestiontService } from '@appointment/services/question.service';
import { Group } from '@appointment/models/group';
import { Question } from '@appointment/models/question';
import { Patient } from '@responsible/models/patient';
import { Responsible } from '@responsible/models/responsible';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-questions',
  templateUrl: './questions.component.html',
  styleUrls: ['./questions.component.scss']
})
export class QuestionsComponent implements OnInit, OnDestroy {
  @Input() formGroup: FormGroup;
  @Input() responsible: Responsible;
  @Input() patients: Array<Patient>;

  groups: Array<Group>;
  questions: Array<Question>;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private groupService: GroupService,
    private questiontService: QuestiontService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    this.formGroup = this.formBuilder.group({
      formArrayQuestions: this.formBuilder.group({})
    });

    this.loadGroups();
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  formSubmit(): void {}

  private loadGroups(): void {
    const groupsSubscription: Subscription = this.groupService.findAll()
    .subscribe((groups: Array<Group>) => {
      this.groups = groups;

      this.groups.map((group: Group) => {
        this.loadQuestions(group);
      });
    });

    this.arraySubscriptions = [...this.arraySubscriptions, groupsSubscription];
  }

  private loadQuestions(group: Group): void {
    const questionsSubscription: Subscription = this.questiontService.findAllByGroupId(group.id)
    .subscribe((questions: Array<Question>) => {
      group.questions = questions;

      questions.map((question: Question) => {
        const formControl: FormControl = new FormControl(null, {
          validators: [
            Validators.required
          ]
        });

        this.formArrayQuestions.addControl(question.id, formControl);
      });
    });

    this.arraySubscriptions = [...this.arraySubscriptions, questionsSubscription];
  }

  get formArrayQuestions(): FormGroup {
    return this.formGroup.get('formArrayQuestions') as FormGroup;
  }

}
