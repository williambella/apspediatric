import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'app-survey-finish',
    templateUrl: 'survey-finish.component.html',
    styleUrls: ['survey-finish.component.scss']
})

export class SurveyFinishComponent implements OnInit {
    constructor(
        private activatedRoute: ActivatedRoute,
        private router: Router
    ) {
        if (!this.activatedRoute.snapshot.paramMap.get('questionnareResult'))
            this.router.navigate(['survey/new']);
    }

    ngOnInit() { }
}