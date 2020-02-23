import { LanguagesService } from '@core/services/languages.service';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Group } from '@appointment/models/group';
import { GroupService } from '@appointment/services/group.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.scss']
})
export class GroupFormComponent implements OnInit, OnDestroy {

  group: Group;
  formGroup: FormGroup;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private route: ActivatedRoute,
    private router: Router,
    private languageService: LanguagesService
  ) {
    this.formGroup = this.formBuilder.group({
      group: [null, Validators.compose([Validators.required])],
      order: [null, Validators.compose([Validators.pattern(/^[0-9]\d*$/)])]
    });
  }

  ngOnInit() {
    const routeSubscription: Subscription = this.route.data.subscribe((data: any) => {
      if (data && data.group) {
        this.group = data.group as Group;

        this.formGroup.get('group').setValue(this.group.group);
        this.formGroup.get('order').setValue(this.group.order);
      }
    });

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  formSubmit(): void {
    if (this.formGroup.valid) {
      const localGroup: Group = {
        group: this.formGroup.get('group').value,
        order: this.formGroup.get('order').value,
        idLang: this.group && this.group.idLang ? this.group.idLang : this.languageService.geCurrenttLang().id
      };

      if (this.group) {
        localGroup.id = this.group.id;
      }

      const formSubmitSubscription: Subscription =  this.groupService.save(localGroup)
      .subscribe((group: Group) => {
        this.router.navigate([`./${group.id}`], {relativeTo: this.route.parent});
      });

      this.arraySubscriptions = [...this.arraySubscriptions, formSubmitSubscription];
    }
  }

}