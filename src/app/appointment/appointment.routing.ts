import { Routes, RouterModule } from '@angular/router';
import { GroupListComponent } from '@appointment/group/group-list/group-list.component';
import { GroupFormComponent } from '@appointment/group/group-form/group-form.component';
import { QuestionFormComponent } from '@appointment/questions/question-form/question-form.component';
import { QuestionResolver } from '@appointment/resolvers/question.resolver';
import { NgModule } from '@angular/core';

const routes: Routes = [
  {
    path: '',
    component: GroupListComponent
  },
  {
    path: 'new',
    component: GroupFormComponent
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
