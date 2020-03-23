import { SurveyService } from './../../services/survey.service';
import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { GroupService } from '@appointment/services/group.service';
import { QuestiontService } from '@appointment/services/question.service';
import { Group } from '@appointment/models/group';
import { Question } from '@appointment/models/question';
import { Patient } from '@responsible/models/patient';
import { Responsible } from '@responsible/models/responsible';
import { Subscription } from 'rxjs';
import { MatStepper } from '@angular/material/stepper';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss']
})
export class ResponsesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formGroup: FormGroup;
  @Input() responsible: Responsible;
  @Input() patients: Array<Patient>;
  @Input() stepper: MatStepper;

  groups: Array<Group>;
  questions: Array<Array<Question>> = new Array<[]>();

  private readonly formArrayName = 'questions';

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private groupService: GroupService,
    private questiontService: QuestiontService,
    private formBuilder: FormBuilder,
    private surveyService: SurveyService
  ) {
  }

  ngOnInit() {
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.formGroup.currentValue) {
      this.formGroup =  this.formBuilder.group({
        patientId: [null, Validators.compose([Validators.required])]
      });

      this.formGroup.addControl(this.formArrayName, this.formBuilder.group({}));

      const patientIdSubscription: Subscription = this.formGroup.get('patientId').valueChanges
      .subscribe((patientId: string) => {
        if (!this.groups) {
          this.loadGroups();
        }
      });

      this.arraySubscriptions = [...this.arraySubscriptions, patientIdSubscription];

    }
  }

  formSubmit(): void {
    if (this.formGroup.valid) {
      const questions: Array<Question> = [];

      Object.keys(this.formGroup.value.questions)
      .map(a => {
        return this.formGroup.value.questions[a];
      }).map((b: Array<Question>) => {
        b.map((q: Question) => questions.push(q));
      });

      // console.log(questions);
      const patientIdSubscription: Subscription = this.surveyService.save(questions)
      .subscribe(() => {
        this.stepper.next();
      });
    }
  }

  questionsFromGroup(idGroup: string): FormGroup {
   return this.formQuestionsArray.get(idGroup) as FormGroup;
  }

  questionByGroupId(id: string): Question {
    return this.questions.reduce((aq: Array<Question>) => aq)
    .find((q: Question) => q.id === id);
  }

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
      if (questions.length) {
        this.formQuestionsArray.addControl(group.id, new FormArray([]));

        this.questions.push(questions);

        questions.map((question: Question) => {
          const formGroup: FormGroup = this.formBuilder.group({
            id: [null],
            questionId: [question.id],
            idGroup: [question.idGroup],
            idType: [question.idType],
            question: [question.question],
            response: [null, Validators.required],
            patientId: [this.formGroup.get('patientId').value]
          });

          (this.formQuestionsArray.get(group.id) as FormArray).push(formGroup);
        });
      }
    });

    this.arraySubscriptions = [...this.arraySubscriptions, questionsSubscription];
  }

  get formQuestionsArray(): FormGroup {
    return this.formGroup.get(this.formArrayName) as FormGroup;
  }

  get getFormArrayName(): string {
    return this.formArrayName;
  }

}
