import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProcedureCoreComponent } from './component/procedure.component';
import { ProcedureRoutingModule } from './procedure-routing';
import { ProcedureFormComponent } from './component/procedure-form/procedure-form.component';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { ProcedureListComponent } from './component/procedure-list/procedure-list.component';
import { ProcedureResolver } from '@appointment/resolvers/procedure.resolver';

@NgModule({
  imports: [
    CommonModule,
    ProcedureRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [ProcedureCoreComponent, ProcedureFormComponent, ProcedureListComponent],
  providers: [
    ProcedureResolver
  ]
})
export class ProcedureModule { }
