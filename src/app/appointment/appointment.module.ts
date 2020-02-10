import { NgModule } from '@angular/core';
import { AppointmentRoutingModule } from './appointment.routing';
import { AppointmentListComponent } from './questions/question-list/appointment-list.component';
import { SharedModule } from '../shared/shared.module';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionResolver } from './resolvers/question.resolver';

@NgModule({
  declarations: [
    QuestionFormComponent,
    AppointmentListComponent
  ],
  imports: [
    SharedModule,
    AppointmentRoutingModule
  ],
  exports: [
  ],
  providers: [
    QuestionResolver
  ]
})
export class AppointmentModule { }
