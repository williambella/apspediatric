import { NgModule } from '@angular/core';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';
import { SharedModule } from '../shared/shared.module';

@NgModule({
  declarations: [
    AppointmentFormComponent
  ],
  imports: [
    SharedModule,
    AppointmentRoutingModule
  ],
  exports: [
  ]
})
export class AppointmentModule { }
