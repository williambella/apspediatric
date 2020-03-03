import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { SurveyComponent } from 'src/app/survey/components/survey/survey.component';
import { SurveyFormComponent } from 'src/app/survey/components/survey-form/survey-form.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        redirectTo: 'new',
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: SurveyFormComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ReportsRoutingModule { }
