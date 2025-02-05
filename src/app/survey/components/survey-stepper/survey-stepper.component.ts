import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Group } from '@appointment/models/group';
import { Type } from '@appointment/models/type';
import { GroupService } from '@appointment/services/group.service';
import { TypeService } from '@appointment/services/type.service';
import { Subscription } from 'rxjs';
import { LogoService } from '@core/services/logo.service';
import { take } from 'rxjs/operators';
import { Logo } from '@core/models/Logo';

@Component({
  selector: 'app-survey-stepper',
  templateUrl: './survey-stepper.component.html',
  styleUrls: ['./survey-stepper.component.scss']
})
export class SurveyStepperComponent implements OnInit, OnDestroy {
  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();
  formGroupResponsible: FormGroup;
  groups: Array<Group>;
  types: Array<Type>;
  logo: Logo;

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private typeService: TypeService,
    private logoService: LogoService
  ) {
    this.formGroupResponsible = this.formBuilder.group({});
  }

  ngOnInit() {
    this.logoService.findLogo().pipe(take(1))
    .subscribe(logo => this.logo = logo);
    
    this.arraySubscriptions
      .push(this.typeService.findAll().subscribe(types => this.types = types));
    this.getGroups();
  }

  private getGroups() {
    const groupSub = this.groupService
      .findAll()
      .subscribe(groups => {
        this.groups = groups.sort((group1, group2) => group1.order - group2.order)
        this.groups[this.groups.length - 1].isLastGroup = true;
      });

    this.arraySubscriptions.push(groupSub);
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.forEach((subscription: Subscription) => subscription.unsubscribe());
  }

}
