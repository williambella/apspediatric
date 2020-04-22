import { Component, Input, OnInit } from '@angular/core';
import { SurveyService } from '@survey/services/survey.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-appointment-detail-questionnare',
    templateUrl: 'appointment-detail-questionnare.component.html'
})

export class AppointmentDetailQuestionnareComponent implements OnInit {
    @Input() patientId: string;
    constructor(private surveyService: SurveyService) { }

    ngOnInit() {

        this.surveyService
            .findByPatientId(this.patientId)
            .pipe(take(1))
            .subscribe(res => console.log(res));
    }
}