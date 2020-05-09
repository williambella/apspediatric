import { Component, OnInit, Input } from '@angular/core';
import { AppointmentService } from '@appointment/services/appointment.service';
import { PatientService } from '@responsible/services/patient.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-appointment-recent',
    templateUrl: 'appointment-recent.component.html',
    styleUrls: ['./appointment-recent.component.scss']
})

export class AppointmentRecentComponent implements OnInit {
    appointments: Array<any>;
    @Input() onDetail: Function;
    
    constructor(
        private appointmentService: AppointmentService,
        private patientService: PatientService
    ) { }

    ngOnInit() {
        this.appointmentService
            .getRecent()
            .pipe(take(1))
            .subscribe(appointments => {
                this.appointments = appointments;
                this.appointments.forEach(app => {
                    
                    this.patientService
                        .findById(app.patientId)
                        .pipe(take(1))
                        .subscribe(patient => {
                            app.patient  = patient;
                        })
                })
            });
    }

    detail(appointment: any) {
        this.onDetail(appointment);
    }
}