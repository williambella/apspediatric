import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreatmentListComponent } from './component/treatment-list/treatment-list.component';
import { TreatmentFormComponent } from './component/treatment-form/treatment-form.component';
import { TreatmentResolver } from '@appointment/resolvers/treatment.resolver';

const routes: Routes = [
  {
    path: '',
    component: TreatmentListComponent
  },
  {
        path: 'new',
        component: TreatmentFormComponent
  },
  {
    path: ':id/edit',
    component: TreatmentFormComponent,
    resolve: {
        group: TreatmentResolver
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TreatmentRoutingModule { }