import { AppointmentModule } from './../appointment/appointment.module';
import { SurveyRoutingModule } from './survey-routing.module';
import { SharedModule } from '@shared/shared.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SurveyComponent } from 'src/app/survey/components/survey/survey.component';
import { SurveyFormComponent } from 'src/app/survey/components/survey-form/survey-form.component';
import { ResponsibleComponent } from './components/responsible/responsible.component';
import { QuestionsComponent } from './components/questions/questions.component';
import { ResponsibleTabsComponent } from './components/responsible-tabs/responsible-tabs.component';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyFormComponent,
    ResponsibleComponent,
    QuestionsComponent,
    ResponsibleTabsComponent
  ],
  imports: [
    CommonModule,
    SharedModule,
    AppointmentModule,
    SurveyRoutingModule
  ],
})
export class SurveyModule { }
