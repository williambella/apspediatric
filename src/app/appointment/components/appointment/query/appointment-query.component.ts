import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Appointment } from '@appointment/models/Appointment';
import { AppointmentService } from '@appointment/services/appointment.service';
import { Subscription } from 'rxjs';

@Component({
    selector: 'app-appointment-query',
    templateUrl: 'appointment-query.component.html',
    styleUrls: ['appointment-query.component.scss']
})

export class AppointmentQueryComponent implements OnInit, OnDestroy {
    appointments: Array<Appointment>;
    showProgressBar: boolean;
    patientId: string;
    baseRoute = 'management/appointment';
    subArray = new Array<Subscription>();

    constructor(
        private activatedRoute: ActivatedRoute,
        private appointmentService: AppointmentService,
        private router: Router
    ) { }

    ngOnInit() {
        const sub = this.activatedRoute.params
            .subscribe(params => {
                this.patientId = params.id;
                this.getAppointmentByPatientId();
            });

        this.subArray.push(sub);
    }

    ngOnDestroy() {
        this.subArray.forEach(sub => sub.unsubscribe());
    }

    private getAppointmentByPatientId() {
        this.showProgressBar = true;

        const sub = this.appointmentService
            .getByPatientId(this.patientId)
            .subscribe(res => {
                this.showProgressBar = false;
                this.appointments = res;
            });

        this.subArray.push(sub);
    }

    detail(appointment: Appointment) {
        this.router.navigate([`${this.baseRoute}/${this.patientId}/detail/${appointment.id}`]);
    }
}