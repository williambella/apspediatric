import { Component, OnInit, OnDestroy } from '@angular/core';
import { CanDeactiveAbstract } from '@core/abstracts/can-deactive-abstract';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Procedure } from '@appointment/models/Procedure';
import { Subscription, Observable } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguagesService } from '@core/services/languages.service';
import { MessagesService } from '@core/services/messages.service';
import { ProcedureService } from '@appointment/services/procedure.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-procedure-form',
  templateUrl: './procedure-form.component.html',
  styleUrls: ['./procedure-form.component.css']
})
export class ProcedureFormComponent extends CanDeactiveAbstract implements OnInit, OnDestroy {
  formGroup: FormGroup;
  procedure: Procedure;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(
      private formBuilder: FormBuilder,
      private procedureService: ProcedureService,
      private route: ActivatedRoute,
      private router: Router,
      private languageService: LanguagesService,
      public messageService: MessagesService
  ) {  
      super();
      this.formGroup = this.formBuilder.group({
      description: [null, Validators.compose([Validators.required])],
      idLang: [null, Validators.compose([Validators.required])],
      id: [null, Validators.compose([Validators.required])]
  });

  }

  ngOnInit() { 
      const routeSubscription: Subscription = this.route.data.subscribe((data: any) => {
          if (data && data.group) {
            this.procedure = data.group as Procedure;
           
            this.formGroup.get('id').setValue(this.procedure.id);
            this.formGroup.get('idLang').setValue(this.procedure.idLang);
            this.formGroup.get('description').setValue(this.procedure.description);
          }
        });
    
        this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  canDeactivate(): Observable<boolean> | boolean  {
    return super.canDeactivate(this.formGroup.dirty);
  }

  formSubmit(): void {
    
    if (this.formGroup) {
      const localProcedure: Procedure = {
        description: this.formGroup.get('description').value,
        id: this.formGroup.get('id').value,
        idLang: this.languageService.geCurrenttLang().id
      };

      if (this.procedure) {
        localProcedure.id = this.procedure.id;
        localProcedure.idLang = this.procedure.idLang; 
      }

      const formSubmitSubscription: Subscription = this.procedureService.save(localProcedure)
      .subscribe((procedure: Procedure) => {
        this.formGroup.markAsPristine();
        this.router.navigate([`./${procedure.id}/edit`], {relativeTo: this.route.parent});
        this.messageService.message('form.updated');
        this.router.navigate([`procedure/`]);
      });

      this.arraySubscriptions = [...this.arraySubscriptions, formSubmitSubscription];
    }
  }

  create() {
    const values = this.formGroup.value;
    values.idLang = this.languageService.geCurrenttLang().id;
    
    this.procedureService
        .save(values)
        .pipe(
            take(1)
        )
        .subscribe(res => {
            this.router.navigate([`procedure/`]);
        });
}

}
