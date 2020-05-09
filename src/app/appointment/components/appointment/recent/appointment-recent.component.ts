import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '@appointment/services/appointment.service';
import { take } from 'rxjs/operators';
import { Appointment } from '@appointment/models/Appointment';

@Component({
    selector: 'app-appointment-recent',
    templateUrl: 'appointment-recent.component.html',
    styleUrls: ['./appointment-recent.component.scss']
})

export class AppointmentRecentComponent implements OnInit {
    appointments: Array<Appointment>;

    constructor(private appointmentService: AppointmentService) { }

    ngOnInit() {
        this.appointmentService
            .getRecent()
            .pipe(take(1))
            .subscribe(appointments => this.appointments = appointments);
    }
}