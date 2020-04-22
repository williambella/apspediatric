import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '@appointment/services/appointment.service';
import { EvaluationService } from '@appointment/services/evaluation.service';
import { take, flatMap } from 'rxjs/operators';
import { Appointment } from '@appointment/models/Appointment';

@Component({
    selector: 'app-appointment-create',
    templateUrl: 'appointment-create.component.html'
})

export class AppointmentCreateComponent {
    appointmentForm: FormGroup;
    patientId: string;
    showProgressBar = false;

    constructor(
        private fb: FormBuilder,
        private appointmentService: AppointmentService,
        private evaluationService: EvaluationService,
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        this.patientId = this.activatedRoute.snapshot.params.id;
        this.appointmentForm = this.fb.group({ description: ['', Validators.required] });
    }

    create() {
        this.showProgressBar = true;
        const values = this.appointmentForm.value;

        this.appointmentService
            .save(this.getAppointment(values))
            .pipe(
                take(1),
                flatMap(appointment => {

                    return this.evaluationService.save({
                        appointmentId: appointment.id,
                        patientId: appointment.patientId,
                        description: values.scale.descripton,
                        scaleId: values.scale.id
                    })
                })
            )
            .subscribe(res => {
                this.showProgressBar = false;
                this.router.navigate([`management/appointment/${this.patientId}`]);
            });
    }


    private getAppointment(values: any): Appointment {
        return {
            description: values.description,
            procedures: values.procedures,
            treatments: values.treatments
                .map(item => ({ ...item.treatment, toothNumber: item.teeth })),
            patientId: this.patientId
        };
    }
}