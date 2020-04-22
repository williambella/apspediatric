import { Component, Input, OnInit } from '@angular/core';
import { Responsible } from '@responsible/models/responsible';
import { PatientService } from '@responsible/services/patient.service';
import { ResponsibleService } from '@responsible/services/responsible.service';
import { Answer } from '@survey/models/Answer';
import { SurveyService } from '@survey/services/survey.service';
import { flatMap, take } from 'rxjs/operators';

@Component({
    selector: 'app-appointment-detail-questionnare',
    templateUrl: 'appointment-detail-questionnare.component.html'
})

export class AppointmentDetailQuestionnareComponent implements OnInit {
    @Input() patientId: string;
    questionnare: Array<Answer>;
    responsible: Responsible;

    constructor(
        private surveyService: SurveyService,
        private responsibleService: ResponsibleService,
        private patientService: PatientService
    ) { }

    ngOnInit() {

        this.patientService.
            findById(this.patientId)
            .pipe(
                take(1),
                flatMap(patient => this.responsibleService
                    .findById(patient.responsibleId)
                    .pipe(take(1)))
            )
            .subscribe(responsible => this.responsible = responsible);

        this.surveyService
            .findByPatientId(this.patientId)
            .pipe(take(1))
            .subscribe(res => this.questionnare = res);
    }
}