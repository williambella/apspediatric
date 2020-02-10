import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppointmentListComponent } from './questions/question-list/appointment-list.component';
import { QuestionFormComponent } from './questions/question-form/question-form.component';
import { QuestionResolver } from './resolvers/question.resolver';


const routes: Routes = [
  {
    path: '',
    component: AppointmentListComponent
  },
  {
    path: 'new',
    component: QuestionFormComponent
  },
  {
    path: ':id',
    component: QuestionFormComponent,
    resolve: {
      appointment: QuestionResolver
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AppointmentRoutingModule { }
