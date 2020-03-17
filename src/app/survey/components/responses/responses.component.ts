import { Component, OnInit, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray, FormControl } from '@angular/forms';
import { GroupService } from '@appointment/services/group.service';
import { QuestiontService } from '@appointment/services/question.service';
import { Group } from '@appointment/models/group';
import { Question } from '@appointment/models/question';
import { Patient } from '@responsible/models/patient';
import { Responsible } from '@responsible/models/responsible';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-responses',
  templateUrl: './responses.component.html',
  styleUrls: ['./responses.component.scss']
})
export class ResponsesComponent implements OnInit, OnDestroy, OnChanges {
  @Input() formGroup: FormGroup;
  @Input() responsible: Responsible;
  @Input() patients: Array<Patient>;

  groups: Array<Group>;
  questions: Array<Question>;

  private readonly formArrayName = 'questions';

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private groupService: GroupService,
    private questiontService: QuestiontService,
    private formBuilder: FormBuilder
  ) {
  }

  ngOnInit() {
    // this.formGroup = this.formBuilder.group({
    //   formArrayQuestions: this.formBuilder.group({})
    // });

    // this.loadGroups();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes && changes.formGroup.currentValue) {
      this.formGroup.addControl(this.formArrayName, new FormArray([]));

      this.loadGroups();

      // if (changes && changes.contacts.currentValue) {
      //   (changes.contacts.currentValue as Array<Contact>).map((contact: Contact) => this.addContact(contact));
      // } else {
      //   this.addContact();
      // }
    }
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
      this.questions = questions;

      const formGroup: FormGroup = new FormGroup({});
      // this.formGroup.addControl(group.id, new FormArray([]));
      // this.formQuestionsArray.push(this.formBuilder.group)

      this.questions.map((question: Question) => this.addQuestion(group, question, formGroup));
    });

    this.arraySubscriptions = [...this.arraySubscriptions, questionsSubscription];
  }

  addQuestion(group: Group, question: Question, formGroup: FormGroup): void {
    const formControl: FormControl = new FormControl({
      id: [null],
      questionId: [question.id],
      idGroup: [group.id],
      idType: [null],
      question: [null],
      response: [null],
      patientId: [null]
    });

    (formGroup.get(group.id) as FormArray).push(formControl);
    // this.formQuestionsArray.get()
    // this.formQuestionsArray.push(this.formBuilder.group({
    //   id: [question ? question.id : null],
    //   questionId: [question ? question.questionid],
    //   idGroup: [],
    //   idType: [],
    //   question: [],
    //   response: [],
    //   patientId: []
    // }));

    this.formQuestionsArray.push(formGroup);
  }

  get formQuestionsArray(): FormArray {
    return this.formGroup.get(this.formArrayName) as FormArray;
  }

}
