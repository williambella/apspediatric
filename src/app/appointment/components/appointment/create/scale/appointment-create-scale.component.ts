import { Component, Input, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { Scale } from '@appointment/models/Scale';
import { ScaleService } from '@appointment/services/scale.service';

@Component({
    selector: 'app-appointment-create-scale',
    templateUrl: 'appointment-create-scale.component.html'
})

export class AppointmentCreateScaleComponent implements OnInit {
    treatments: Array<Scale>;
    @Input() formGroup: FormGroup;

    constructor(private scaleService: ScaleService) {

    }

    ngOnInit() {

    }
}