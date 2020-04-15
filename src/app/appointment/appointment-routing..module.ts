import { QuestionResolver } from '@appointment/resolvers/question.resolver';
import { QuestionFormComponent } from '@appointment/components/questions/question-form/question-form.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupResolver } from './resolvers/group.resolver';
import { GroupListComponent } from '@appointment/components/group/group-list/group-list.component';
import { GroupFormComponent } from '@appointment/components/group/group-form/group-form.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { DeactiveGuard } from '@core/guard/deactive.guard';
import { QuestionListComponent } from './components/questions/question-list/question-list.component';
import { QuestionsComponent } from './components/questions/questions/questions.component';
import { TypesResolver } from './resolvers/types.resolver';
import { AppointmentQueryComponent } from './components/appointment/query/appointment-query.component';
import { AppointmentCreateComponent } from './components/appointment/create/appointment-create.component';
import { AppointmentDetailComponent } from './components/appointment/detail/appointment-detail.component';

const routes: Routes = [
  {
    path: 'groups',
    component: AppointmentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        canDeactivate: [DeactiveGuard],
        component: GroupListComponent
      },
      {
        path: 'new',
        canDeactivate: [DeactiveGuard],
        component: GroupFormComponent
      },
      {
        path: ':id/edit',
        canDeactivate: [DeactiveGuard],
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
            canDeactivate: [DeactiveGuard],
            component: QuestionFormComponent,
            resolve: {
              types: TypesResolver
            }
          },
          {
            path: ':id',
            canDeactivate: [DeactiveGuard],
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
        path: '',
        canDeactivate: [DeactiveGuard],
        component: AppointmentQueryComponent
      },
      {
        path: 'new',
        canDeactivate: [DeactiveGuard],
        component: AppointmentCreateComponent
      },
      {
        path: ':id',
        canDeactivate: [DeactiveGuard],
        component: AppointmentDetailComponent
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
