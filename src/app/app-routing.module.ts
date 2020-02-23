import { PageNotFoundComponent } from './@core/layout/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from '@core/layout/template/template.component';

const routes: Routes = [
  {
    path: '',
    // pathMatch: 'full',
    // redirectTo: 'login'
    component: TemplateComponent,
    children: [
      {
        path: 'appointment',
        loadChildren: () => import('./appointment/appointment.module').then(a => a.AppointmentModule)
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(r => r.AuthModule)
      },
    ]
  },
  {
    path: '**',
    component: PageNotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
