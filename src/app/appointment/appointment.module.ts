import { NgModule } from '@angular/core';
import { QuestionFormComponent } from '@appointment/questions/question-form/question-form.component';
import { AppointmentListComponent } from '@appointment/questions/question-list/appointment-list.component';
import { GroupFormComponent } from '@appointment/group/group-form/group-form.component';
import { GroupListComponent } from '@appointment/group/group-list/group-list.component';
import { AppointmentRoutingModule } from '@appointment/appointment.routing';
import { QuestionResolver } from '@appointment/resolvers/question.resolver';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    QuestionFormComponent,
    AppointmentListComponent,
    GroupFormComponent,
    GroupListComponent
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
