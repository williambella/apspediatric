import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupFormComponent } from '@appointment/components/group/group-form/group-form.component';
import { GroupListComponent } from '@appointment/components/group/group-list/group-list.component';
import { QuestionFormComponent } from '@appointment/components/questions/question-form/question-form.component';
import { QuestionResolver } from '@appointment/resolvers/question.resolver';
import { AuthGuard } from '@core/guard/auth.guard';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AppointmentCreateComponent } from './components/appointment/create/appointment-create.component';
import { AppointmentDetailComponent } from './components/appointment/detail/appointment-detail.component';
import { AppointmentQueryComponent } from './components/appointment/query/appointment-query.component';
import { QuestionListComponent } from './components/questions/question-list/question-list.component';
import { QuestionsComponent } from './components/questions/questions/questions.component';
import { GroupResolver } from './resolvers/group.resolver';
import { TypesResolver } from './resolvers/types.resolver';
import { GroupComponent } from './components/group/group.component';

const routes: Routes = [
  {
    path: 'groups',
    component: GroupComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: GroupListComponent
      },
      {
        path: 'new',
        component: GroupFormComponent
      },
      {
        path: ':id/edit',
        component: GroupFormComponent,
        resolve: {
          group: GroupResolver
        }
      },
      {
        path: ':id/questions',
        component: QuestionsComponent,
        resolve: {
          group: GroupResolver
        },
        children: [
          {
            path: '',
            component: QuestionListComponent
          },
          {
            path: 'new',
            component: QuestionFormComponent,
            resolve: {
              types: TypesResolver
            }
          },
          {
            path: ':id',
            component: QuestionFormComponent,
            resolve: {
              question: QuestionResolver,
              types: TypesResolver
            }
          }
        ]
      }
    ]
  },
  {
    path: 'appointment',
    component: AppointmentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: ':id',
        component: AppointmentQueryComponent,
        data: { title: 'Query Appointments', showNewButton: true }
      },
      {
        path: ':id/new',
        component: AppointmentCreateComponent,
        data: { title: 'New Appointments', showNewButton: false }
      },
      {
        path: ':id/detail',
        component: AppointmentDetailComponent,
        data: { title: 'Detail Appointments', showNewButton: false }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
