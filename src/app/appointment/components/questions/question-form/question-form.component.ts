import { ActivatedRoute, Router } from '@angular/router';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { Group } from '@appointment/models/group';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Type } from '@appointment/models/type';
import { Subscription, Observable } from 'rxjs';
import { CanDeactiveAbstract } from '@core/abstracts/can-deactive-abstract';
import { QuestiontService } from '@appointment/services/question.service';
import { LanguagesService } from '@core/services/languages.service';
import { Question } from '@appointment/models/question';
import { MessagesService } from '@core/services/messages.service';

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
      idType: [null, Validators.compose([Validators.required])]
    });
  }

  ngOnInit() {
    this.route.data.subscribe((data: any) => {
      if (data && data.question) {
        this.question = data.question;

        this.formGroup.get('question').setValue(this.question.question);
        this.formGroup.get('idType').setValue(this.question.idType);
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

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  canDeactivate(): Observable<boolean> | boolean  {
    return super.canDeactivate(this.formGroup.dirty);
  }

  formSubmit(): void {
    if (this.formGroup.valid) {
      const localQuestion: Question = {
        idGroup: this.group.id,
        idType: this.formGroup.get('idType').value,
        question: this.formGroup.get('question').value,
        idLang: this.languageService.geCurrenttLang().id
      };

      if (this.question) {
        localQuestion.id = this.question.id;
        localQuestion.idLang = this.question.idLang;
      }

      const formSubmitSubscription: Subscription =  this.questionService.save(localQuestion)
      .subscribe((question: Question) => {
        this.formGroup.markAsPristine();
        this.router.navigate(['/', 'appointment',  'groups', this.group.id, 'questions']);

        this.messageService.message('form.updated');
      });

      this.arraySubscriptions = [...this.arraySubscriptions, formSubmitSubscription];
    }
  }

  compareFn(x: Type, y: Type): boolean {
    return x && y ? x === y : x === y;
  }
}
