import { NgModule } from '@angular/core';
import { QuestionFormComponent } from '@appointment/questions/question-form/question-form.component';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { GroupListComponent } from '@appointment/group/group-list/group-list.component';
import { GroupFormComponent } from '@appointment/group/group-form/group-form.component';
import { AppointmentRoutingModule } from '@appointment/appointment.routing';
import { QuestionResolver } from '@appointment/resolvers/question.resolver';
import { GroupResolver } from './resolvers/group.resolver';
import { SharedModule } from '@shared/shared.module';

@NgModule({
  declarations: [
    QuestionFormComponent,
    QuestionListComponent,
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
    QuestionResolver,
    GroupResolver
  ]
})
export class AppointmentModule { }
