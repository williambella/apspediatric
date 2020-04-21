import { NgModule } from '@angular/core';
import { QuestionFormComponent } from '@appointment/components/questions/question-form/question-form.component';
import { QuestionListComponent } from './components/questions/question-list/question-list.component';
import { GroupListComponent } from '@appointment/components/group/group-list/group-list.component';
import { GroupFormComponent } from '@appointment/components/group/group-form/group-form.component';
import { AppointmentRoutingModule } from '@appointment/appointment-routing..module';
import { QuestionResolver } from '@appointment/resolvers/question.resolver';
import { GroupResolver } from './resolvers/group.resolver';
import { SharedModule } from '@shared/shared.module';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { QuestionsComponent } from './components/questions/questions/questions.component';
import { TypesResolver } from './resolvers/types.resolver';
import { FormsModule } from '@angular/forms';
import { AppointmentQueryComponent } from './components/appointment/query/appointment-query.component';
import { AppointmentCreateComponent } from './components/appointment/create/appointment-create.component';
import { AppointmentDetailComponent } from './components/appointment/detail/appointment-detail.component';
import { AppointmentQuerySearchComponent } from './components/appointment/query/search/appointment-query-search.component';


@NgModule({
  declarations: [
    QuestionFormComponent,
    QuestionListComponent,
    GroupFormComponent,
    GroupListComponent,
    AppointmentComponent,
    QuestionsComponent,
    AppointmentQueryComponent,
    AppointmentCreateComponent,
    AppointmentDetailComponent,
    AppointmentQuerySearchComponent
  ],
  imports: [
    SharedModule,
    FormsModule,
    AppointmentRoutingModule
  ],
  exports: [
  ],
  providers: [
    QuestionResolver,
    GroupResolver,
    TypesResolver
  ]
})
export class AppointmentModule { }
