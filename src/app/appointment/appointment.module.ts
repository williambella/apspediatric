import { SharedModule } from '@core/shared/shared/shared.module';
import { NgModule } from '@angular/core';

import { AppointmentRoutingModule } from './appointment-routing.module';
import { AppointmentFormComponent } from './appointment-form/appointment-form.component';


@NgModule({
  declarations: [AppointmentFormComponent],
  imports: [
    SharedModule,
    AppointmentRoutingModule
  ]
})
export class AppointmentModule { }
