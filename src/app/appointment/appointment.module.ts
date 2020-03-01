import { NgModule } from '@angular/core';
import { QuestionFormComponent } from '@appointment/components/questions/question-form/question-form.component';
import { QuestionListComponent } from './components/questions/question-list/question-list.component';
import { GroupListComponent } from '@appointment/components/group/group-list/group-list.component';
import { GroupFormComponent } from '@appointment/components/group/group-form/group-form.component';
import { AppointmentRoutingModule } from '@appointment/appointment.routing';
import { QuestionResolver } from '@appointment/resolvers/question.resolver';
import { GroupResolver } from './resolvers/group.resolver';
import { SharedModule } from '@shared/shared.module';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { QuestionsComponent } from './components/questions/questions/questions.component';

@NgModule({
  declarations: [
    QuestionFormComponent,
    QuestionListComponent,
    GroupFormComponent,
    GroupListComponent,
    AppointmentComponent,
    QuestionsComponent
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
