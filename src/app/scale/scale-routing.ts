import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TreatmentResolver } from '@appointment/resolvers/treatment.resolver';
import { ScaleListComponent } from './component/scale-list/scale-list.component';
import { ScaleFormComponent } from './component/scale-form/scale-form.component';
import { ScaleResolver } from '@appointment/resolvers/scale.resolver';

const routes: Routes = [
  {
    path: '',
    component: ScaleListComponent
  },
  {
        path: 'new',
        component: ScaleFormComponent
  },
  {
    path: ':id/edit',
    component: ScaleFormComponent,
    resolve: {
        group: ScaleResolver
    }
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ScaleRoutingModule { }