import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { QuestionListComponent } from './questions/question-list/question-list.component';
import { GroupResolver } from './resolvers/group.resolver';
import { GroupListComponent } from '@appointment/group/group-list/group-list.component';
import { GroupFormComponent } from '@appointment/group/group-form/group-form.component';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'groups'
  },
  {
    path: 'groups',
    component: GroupListComponent,
    children: [
      {
        path: 'new',
        component: GroupFormComponent
      },
      {
        path: ':id',
        component: QuestionListComponent,
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
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
