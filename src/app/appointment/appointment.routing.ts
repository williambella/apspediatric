import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './components/questions/question-list/question-list.component';
import { GroupResolver } from './resolvers/group.resolver';
import { GroupListComponent } from '@appointment/components/group/group-list/group-list.component';
import { GroupFormComponent } from '@appointment/components/group/group-form/group-form.component';
import { AppointmentComponent } from './components/appointment/appointment.component';

const routes: Routes = [
  {
    path: '',
    // pathMatch: 'full',
    // redirectTo: 'groups',
    // component: AppointmentComponent,
    children: [
      {
        path: 'groups',
        component: AppointmentComponent,
        children: [
          {
            path: 'new',
            component: GroupFormComponent
          },
          {
            path: ':id',
            component: GroupListComponent,
            resolve: {
              group: GroupResolver
            },
            children: [
              {
                path: 'edit',
                component: GroupFormComponent
              }
            ],
          }
        ]
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
