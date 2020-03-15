import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SurveyRoutingModule } from '@survey/survey-routing.module';
import { SurveyComponent } from '@survey/components/survey/survey.component';
import { SurveyStepperComponent } from '@survey/components/survey-stepper/survey-stepper.component';
import { PatientComponent } from '@survey/components/patient/patient.component';
import { ResponsibleComponent } from '@survey/components/responsible/responsible.component';
import { ResponsibleTabsComponent } from '@survey/components/responsible-tabs/responsible-tabs.component';
import { QuestionsComponent } from '@survey//components/questions/questions.component';
import { AppointmentModule } from '@appointment/appointment.module';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyStepperComponent,
    ResponsibleComponent,
    QuestionsComponent,
    ResponsibleTabsComponent,
    PatientComponent
  ],
  imports: [
    SharedModule,
    AppointmentModule,
    SurveyRoutingModule
  ],
})
export class SurveyModule { }
