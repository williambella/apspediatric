import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '@appointment/services/appointment.service';
import { Patient } from '@responsible/models/patient';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styles: []
})
export class AppointmentComponent {
  patient: Patient;
  appointments: any;
  selectedPatientId: string;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    if (this.activatedRoute.children
      && this.activatedRoute.children.length > 0)
      this.activatedRoute.children[0].params
        .pipe(take(1))
        .subscribe(params => this.selectedPatientId = params.id);
  }

  doSelect = (patient: Patient) => {
    this.patient = patient;
    this.router.navigate([`management/appointment/${this.patient.id}`]);
  }
}
