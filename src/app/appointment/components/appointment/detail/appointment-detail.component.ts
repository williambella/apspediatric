import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Appointment } from '@appointment/models/Appointment';
import { Evaluation } from '@appointment/models/Evaluation';
import { Scale } from '@appointment/models/Scale';
import { AppointmentService } from '@appointment/services/appointment.service';
import { EvaluationService } from '@appointment/services/evaluation.service';
import { ScaleService } from '@appointment/services/scale.service';
import { Answer } from '@survey/models/Answer';
import { flatMap, take } from 'rxjs/operators';

@Component({
    selector: 'app-appointment-detail',
    templateUrl: 'appointment-detail.component.html',
    styleUrls: ['appointment-detail.component.scss']
})

export class AppointmentDetailComponent implements OnInit {
    appointment: Appointment;
    evaluation: Evaluation;
    scales: Array<Scale>;
    showProgressBar = false;
    questionnare: Array<Answer>;
    patientId: string;

    constructor(
        private appointmentService: AppointmentService,
        private evaluationService: EvaluationService,
        private scaleService: ScaleService,
        private activatedRoute: ActivatedRoute
    ) {
        this.patientId = this.activatedRoute.snapshot.params.id;
    }

    ngOnInit() {
        const params = this.activatedRoute.snapshot.params;

        this.showProgressBar = true;
        this.appointmentService
            .getById(params.idAppointment)
            .pipe(
                take(1),
                flatMap(appointment => {
                    this.appointment = appointment;

                    return this.evaluationService
                        .findByAppointmentId(appointment.id)
                        .pipe(take(1));
                })
            )
            .subscribe(evaluation => {
                this.evaluation = evaluation;
                this.showProgressBar = false;
            });

        this.scaleService
            .findAll()
            .pipe(take(1))
            .subscribe(scales => this.scales = scales);


    }

    getScale(id: string): Scale {
        if (!id) return;
        return this.scales
            ? this.scales.find(scale => scale.id === id)
            : null;
    }
}