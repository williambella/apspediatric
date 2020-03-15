import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '@core/guard/auth.guard';
import { SurveyComponent } from '@survey/components/survey/survey.component';
import { SurveyStepperComponent } from '@survey/components/survey-stepper/survey-stepper.component';

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
        component: SurveyStepperComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
