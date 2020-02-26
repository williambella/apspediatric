import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GroupResolver } from './resolvers/group.resolver';
import { GroupListComponent } from '@appointment/components/group/group-list/group-list.component';
import { GroupFormComponent } from '@appointment/components/group/group-form/group-form.component';
import { AppointmentComponent } from './components/appointment/appointment.component';
import { AuthGuard } from '@core/guard/auth.guard';
import { DeactiveGuard } from '@core/guard/deactive.guard';

const routes: Routes = [
  {
    path: 'groups',
    component: AppointmentComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'all'
      },
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
        canDeactivate: [DeactiveGuard],
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
