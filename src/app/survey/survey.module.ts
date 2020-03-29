import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SurveyRoutingModule } from '@survey/survey-routing.module';
import { SurveyComponent } from '@survey/components/survey/survey.component';
import { SurveyStepperComponent } from '@survey/components/survey-stepper/survey-stepper.component';
import { PatientsComponent } from '@survey/components/responsible-step/patients/patients.component';
import { ResponsibleComponent } from '@survey/components/responsible-step/responsible/responsible.component';
import { ResponsibleStepComponent } from '@survey/components/responsible-step/responsible-step.component';
import { ResponsesComponent } from '@survey/components/responses/responses.component';
import { ContactsComponent } from '@survey/components/responsible-step/contacts/contacts.component';
import { AppointmentModule } from '@appointment/appointment.module';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyStepperComponent,
    ResponsibleComponent,
    ResponsesComponent,
    ResponsibleStepComponent,
    PatientsComponent,
    ContactsComponent
  ],
  imports: [
    SharedModule,
    AppointmentModule,
    SurveyRoutingModule
  ],
})
export class SurveyModule { }
