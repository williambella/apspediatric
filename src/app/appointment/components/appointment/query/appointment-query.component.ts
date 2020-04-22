import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { AppointmentService } from '@appointment/services/appointment.service';
import { take } from 'rxjs/operators';
import { Appointment } from '@appointment/models/Appointment';

@Component({
    selector: 'app-appointment-query',
    templateUrl: 'appointment-query.component.html',
    styleUrls: ['appointment-query.component.scss']
})

export class AppointmentQueryComponent implements OnInit {
    appointments: Array<Appointment>;
    showProgressBar: boolean;

    constructor(
        private activatedRoute: ActivatedRoute,
        private appointmentService: AppointmentService
    ) { }

    ngOnInit() {
        this.activatedRoute.params.subscribe(params => {
            this.showProgressBar = true;
            this.getAppointmentByPatientId(params.id);
        });
    }

    private getAppointmentByPatientId(patientId: string) {
        this.appointmentService
            .getByPatientId(patientId)
            .pipe(take(1))
            .subscribe(res => {
                this.showProgressBar = false;
                this.appointments = res;
            });
    }
}