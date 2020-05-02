import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PatientResolver } from '@appointment/resolvers/patient.resolver';
import { PatientListComponent } from './component/patient-list/patient-list.component';
import { PatientFormComponent } from './component/patient-form/patient-form.component';

const routes: Routes = [
  {
    path: '',
    component: PatientListComponent
  },
  {
        path: 'new',
        component: PatientFormComponent
  },
  {
    path: ':id/edit',
    component: PatientFormComponent,
    resolve: {
      group: PatientResolver
    }
  }

]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PatientRoutingModule { }