import { HomeComponent } from './home/home.component';
import { PageNotFoundComponent } from '@core/layout/page-not-found/page-not-found.component';
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
        redirectTo: 'survey',
        pathMatch: 'full'
      },
      {
        path: 'auth',
        loadChildren: () => import('./auth/auth.module').then(auth => auth.AuthModule)
      },
      {
        path: 'management',
        loadChildren: () => import('./appointment/appointment.module').then(appointment => appointment.AppointmentModule)
      },
      {
        path: 'procedure',
        loadChildren: () => import('./procedure/procedure.module').then(procedure => procedure.ProcedureModule)
      },
      {
        path: 'treatment',
        loadChildren: () => import('./treatment/treatment.module').then(treatment => treatment.TreatmentModule)
      },
      {
        path: 'survey',
        loadChildren: () => import('./survey/survey.module').then(reports => reports.SurveyModule)
      },
      {
        path: 'scale',
        loadChildren: () => import('./scale/scale.module').then(reports => reports.ScaleModule)
      },
      {
        path: 'patient',
        loadChildren: () => import('./patient/patient.module').then(reports => reports.PatientModule)
      }
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
