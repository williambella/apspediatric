import { NgModule } from '@angular/core';
import { QuestionFormComponent } from '@appointment/components/questions/question-form/question-form.component';
import { QuestionListComponent } from './components/questions/question-list/question-list.component';
import { GroupListComponent } from '@appointment/components/group/group-list/group-list.component';
import { GroupFormComponent } from '@appointment/components/group/group-form/group-form.component';
import { AppointmentRoutingModule } from '@appointment/appointment-routing.module';
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
import { AppointmentQuerySelectComponent } from './components/appointment/query/select/appointment-query-select.component';
import { AppointmentRecentComponent } from './components/appointment/recent/appointment-recent.component';
import { AppointmentCreateTreatmentComponent } from './components/appointment/create/treatment/appointment-create-treatment.component';
import { AppointmentCreateProcedureComponent } from './components/appointment/create/procedure/appointment-create-procedure.component';
import { AppointmentCreateScaleComponent } from './components/appointment/create/scale/appointment-create-scale.component';
import { GroupComponent } from './components/group/group.component';
import { AppointmentDetailQuestionnareComponent } from './components/appointment/detail/questionnare/appointment-detail-questionnare.component';


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
    AppointmentQuerySelectComponent,
    AppointmentCreateTreatmentComponent,
    AppointmentCreateProcedureComponent,
    AppointmentCreateScaleComponent,
    GroupComponent,
    AppointmentDetailQuestionnareComponent,
    AppointmentRecentComponent
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
