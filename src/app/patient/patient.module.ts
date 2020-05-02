import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormsModule } from '@angular/forms';
import { PatientRoutingModule } from './patient-routing';
import { PatientComponent } from './component/patient.component';
import { PatientListComponent } from './component/patient-list/patient-list.component';
import { PatientResolver } from '@appointment/resolvers/patient.resolver';
import { PatientFormComponent } from './component/patient-form/patient-form.component';

@NgModule({
  imports: [
    CommonModule,
    PatientRoutingModule,
    SharedModule,
    FormsModule
  ],
  declarations: [PatientComponent, PatientFormComponent, PatientListComponent],
  providers: [
    PatientResolver
  ]
})
export class PatientModule { }
