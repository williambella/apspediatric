import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveyStepperComponent } from '@survey/components/survey-stepper/survey-stepper.component';
import { SurveyComponent } from '@survey/components/survey/survey.component';
import { SurveyFinishComponent } from './components/survey-finish/survey-finish.component';

const routes: Routes = [
  {
    path: '',
    component: SurveyComponent,
    children: [
      {
        path: '',
        redirectTo: 'new',
        pathMatch: 'full'
      },
      {
        path: 'new',
        component: SurveyStepperComponent
      },
      {
        path: 'done',
        component: SurveyFinishComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SurveyRoutingModule { }
