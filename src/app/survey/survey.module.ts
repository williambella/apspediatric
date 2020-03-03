import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReportsRoutingModule } from 'src/app/survey/survey-routing.module';
import { SurveyComponent } from 'src/app/survey/components/survey/survey.component';
import { SurveyFormComponent } from 'src/app/survey/components/survey-form/survey-form.component';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyFormComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    ReportsRoutingModule
  ],
})
export class SurveyModule { }
