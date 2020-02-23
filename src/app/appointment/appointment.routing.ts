import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupResolver } from './resolvers/group.resolver';
import { GroupListComponent } from '@appointment/components/group/group-list/group-list.component';
import { GroupFormComponent } from '@appointment/components/group/group-form/group-form.component';
import { AppointmentComponent } from './components/appointment/appointment.component';

const routes: Routes = [
  {
    path: 'groups',
    component: AppointmentComponent,
    children: [
      {
        path: 'new',
        component: GroupFormComponent
      },
      {
        path: 'all',
        component: GroupListComponent
      },
      {
        path: ':id',
        component: GroupListComponent,
        resolve: {
          group: GroupResolver
        }
      },
      {
        path: ':id/edit',
        component: GroupFormComponent,
        resolve: {
          group: GroupResolver
        }
      }
    ]
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
