import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { TreatmentRoutingModule } from './treatment-routing';
import { TreatmentComponent } from './component/treatment.component';
import { TreatmentFormComponent } from './component/treatment-form/treatment-form.component';
import { TreatmentListComponent } from './component/treatment-list/treatment-list.component';
import { TreatmentResolver } from '@appointment/resolvers/treatment.resolver';

@NgModule({
  imports: [
    CommonModule,
    TreatmentRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [TreatmentComponent, TreatmentFormComponent, TreatmentListComponent],
  providers: [
    TreatmentResolver
  ]
})
export class TreatmentModule { }