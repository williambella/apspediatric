import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from './@core/layout/page-not-found/page-not-found.component';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TemplateComponent } from '@core/layout/template/template.component';

const routes: Routes = [
  {
    path: '',
    component: TemplateComponent,
    children: [
      {
        path: '',
        component: HomeComponent
      },
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
