import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ProcedureFormComponent } from './component/procedure-form/procedure-form.component';
import { ProcedureListComponent } from './component/procedure-list/procedure-list.component';
import { ProcedureResolver } from '@appointment/resolvers/procedure.resolver';

const routes: Routes = [
  {
    path: '',
    component: ProcedureListComponent
  },
  {
        path: 'new',
        component: ProcedureFormComponent
  },
  {
    path: ':id/edit',
    component: ProcedureFormComponent,
    resolve: {
      group: ProcedureResolver
    }
  }

]; 

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProcedureRoutingModule { }
