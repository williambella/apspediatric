import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Scale } from '@appointment/models/Scale';
import { Subscription } from 'rxjs';
import { ScaleService } from '@appointment/services/scale.service';
import { ActivatedRoute, Router } from '@angular/router';
import { LanguagesService } from '@core/services/languages.service';
import { MessagesService } from '@core/services/messages.service';
import { CanDeactiveAbstract } from '@core/abstracts/can-deactive-abstract';

@Component({
  selector: 'app-scale-form',
  templateUrl: './scale-form.component.html',
  styleUrls: ['./scale-form.component.css']
})
export class ScaleFormComponent extends CanDeactiveAbstract implements OnInit, OnDestroy {

  formGroup: FormGroup;
  scale: Scale;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();
  constructor(
      private formBuilder: FormBuilder,
      private scaleService: ScaleService,
      private route: ActivatedRoute,
      private router: Router,
      private languageService: LanguagesService,
      public messageService: MessagesService
  ) {  
      super();
      this.formGroup = this.formBuilder.group({
      description: [null, Validators.compose([Validators.required])],
      idLang: [null, Validators.compose([Validators.required])],
      id: [null, Validators.compose([Validators.required])],
      status: [null, Validators.compose([Validators.required])],
      orderScale: [null, Validators.compose([Validators.required])],
      title: [null, Validators.compose([Validators.required])]
  });

  }

  ngOnInit() {
    const routeSubscription: Subscription = this.route.data.subscribe((data: any) => {
      if (data && data.group) {
        this.scale = data.group as Scale;
       
        this.formGroup.get('id').setValue(this.scale.id);
        this.formGroup.get('idLang').setValue(this.scale.idLang);
        this.formGroup.get('description').setValue(this.scale.descripton);
        this.formGroup.get('status').setValue(this.scale.status);
        this.formGroup.get('orderScale').setValue(this.scale.orderScale);
        this.formGroup.get('title').setValue(this.scale.title);
      }
    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  formSubmit(): void {
    
    if (this.formGroup) {
      const localScale: Scale = {
        descripton: this.formGroup.get('description').value,
        id: this.formGroup.get('id').value,
        idLang: this.languageService.geCurrenttLang().id,
        status: this.formGroup.get('status').value,
        orderScale: this.formGroup.get('orderScale').value,
        title: this.formGroup.get('title').value

      };

      if (this.scale) {
        localScale.id = this.scale.id;
        localScale.idLang = this.scale.idLang; 
        localScale.orderScale = this.scale.orderScale;
        localScale.status = this.scale.status;
        localScale.title = this.scale.title;
      }

      const formSubmitSubscription: Subscription = this.scaleService.save(localScale)
      .subscribe((scale: Scale) => {
        this.formGroup.markAsPristine();
        this.router.navigate([`./${scale.id}/edit`], {relativeTo: this.route.parent});
        this.messageService.message('form.updated');
        this.router.navigate([`scale/`]);
      });

      this.arraySubscriptions = [...this.arraySubscriptions, formSubmitSubscription];
    }
  }

}
