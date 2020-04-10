import { NgModule } from '@angular/core';
import { SharedModule } from '@shared/shared.module';
import { SurveyRoutingModule } from '@survey/survey-routing.module';
import { SurveyComponent } from '@survey/components/survey/survey.component';
import { SurveyStepperComponent } from '@survey/components/survey-stepper/survey-stepper.component';
import { PatientsComponent } from '@survey/components/responsible-step/patients/patients.component';
import { ResponsibleComponent } from '@survey/components/responsible-step/responsible/responsible.component';
import { ResponsibleStepComponent } from '@survey/components/responsible-step/responsible-step.component';
import { ContactsComponent } from '@survey/components/responsible-step/contacts/contacts.component';
import { AppointmentModule } from '@appointment/appointment.module';
import { GenericStepComponent } from './components/generic-step/generic-step.component';
import { DynamicFormComponent } from './components/dynamic-form/dynamic-form.component';
import { DynamicFormQuestionComponent } from './components/dynamic-form-question/dynamic-form-question.component';
import { SurveyFinishComponent } from './components/survey-finish/survey-finish.component';

@NgModule({
  declarations: [
    SurveyComponent,
    SurveyStepperComponent,
    ResponsibleComponent,
    ResponsibleStepComponent,
    PatientsComponent,
    ContactsComponent,
    GenericStepComponent,
    DynamicFormComponent,
    DynamicFormQuestionComponent,
    SurveyFinishComponent
  ],
  imports: [
    SharedModule,
    AppointmentModule,
    SurveyRoutingModule
  ]
})
export class SurveyModule { }
