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

const routes: Routes = [
  {
    path: 'groups',
    component: AppointmentComponent,
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
        component: QuestionListComponent,
        canDeactivate: [DeactiveGuard],
        resolve: {
          group: GroupResolver
        },
        children: [
          {
            path: 'new',
            component: QuestionFormComponent,
          },
          {
            path: ':id',
            component: QuestionFormComponent,
            resolve: {
              question: QuestionResolver
            }
          }
        ]
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
