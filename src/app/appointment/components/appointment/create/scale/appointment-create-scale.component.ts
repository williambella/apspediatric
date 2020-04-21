import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { Scale } from '@appointment/models/Scale';
import { ScaleService } from '@appointment/services/scale.service';

@Component({
    selector: 'app-appointment-create-scale',
    templateUrl: 'appointment-create-scale.component.html'
})

export class AppointmentCreateScaleComponent implements OnInit {
    treatments: Array<Scale>;
    @Input() formGroup: FormGroup;

    constructor(
        private scaleService: ScaleService,
        private fb: FormBuilder
        ) {

    }

    ngOnInit() {
        this.formGroup.addControl('scale', this.fb.control(2, Validators.required));
    }
}