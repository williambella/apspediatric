import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '@appointment/models/group';
import { Question } from '@appointment/models/question';
import { Type } from '@appointment/models/type';
import { QuestiontService } from '@appointment/services/question.service';
import { CanDeactiveAbstract } from '@core/abstracts/can-deactive-abstract';
import { LanguagesService } from '@core/services/languages.service';
import { MessagesService } from '@core/services/messages.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-question-form',
  templateUrl: './question-form.component.html',
  styleUrls: ['./question-form.component.scss']
})
export class QuestionFormComponent extends CanDeactiveAbstract implements OnInit, OnDestroy {

  formGroup: FormGroup;
  group: Group;
  question: Question;
  types: Array<Type>;
  isToInsertOptions = false;
  options = new Array<{ value: string }>();

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguagesService,
    private questionService: QuestiontService,
    public messageService: MessagesService
  ) {
    super();

    this.formGroup = this.formBuilder.group({
      question: [null, Validators.compose([Validators.required])],
      idType: [null, Validators.compose([Validators.required])],
    });

    this.formGroup.controls.idType.valueChanges.subscribe(value => {

      if (this.types && this.types
        .some(type => type.id === value
          && (type.abbrev.toLowerCase() === 'select'
            || type.abbrev.toLowerCase() === 'radio'))) {

        this.isToInsertOptions = true;
        this.options.push({ value: '' });

      } else {
        this.isToInsertOptions = false;
      }


    });
  }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      if (data && data.question) {
        this.question = data.question;

        this.formGroup.get('question').setValue(this.question.question);
        this.formGroup.get('idType').setValue(this.question.idType);

        const options = data.question.options;
        if (options) {
          Object
            .keys(options)
            .forEach(key => this.options.push({ value: options[key] }));

          this.isToInsertOptions = true;
        }
      }

      if (data && data.types) {
        this.types = data.types;
      }
    });


    this.route.parent.data.subscribe((data: any) => {
      if (data && data.group) {
        this.group = data.group;
      }
    });
  }

  removeOption = (option: { value: string }) => {
    this.options = this.options.filter(opt => opt.value !== option.value);
  };

  addOption() {
    this.options.push({ value: '' });
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  isFormValid(): boolean {
    return this.formGroup.valid && (!this.isToInsertOptions
      || this.isToInsertOptions && this.options.length > 0
      && !!this.options[0].value);
  }

  formSubmit(): void {
    const localQuestion: Question = {
      idGroup: this.group.id,
      idType: this.formGroup.get('idType').value,
      question: this.formGroup.get('question').value,
      idLang: this.languageService.geCurrenttLang().id
    };

    if (this.options.length > 0) {
      let options = {};
      this.options
        .forEach(option => options[option.value.toLowerCase().replace(' ', '')] = option.value)

      localQuestion.options = options;
    }

    if (this.question) {
      localQuestion.id = this.question.id;
      localQuestion.idLang = this.question.idLang;
    }

    const formSubmitSubscription: Subscription = this.questionService.save(localQuestion)
      .subscribe(() => {
        this.formGroup.markAsPristine();
        this.router.navigate(['/', 'appointment', 'groups', this.group.id, 'questions']);

        this.messageService.message('form.updated');
      });

    this.arraySubscriptions = [...this.arraySubscriptions, formSubmitSubscription];
  }
}
