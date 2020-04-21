import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Scale } from '@appointment/models/Scale';
import { ScaleService } from '@appointment/services/scale.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-appointment-create-scale',
    templateUrl: 'appointment-create-scale.component.html'
})

export class AppointmentCreateScaleComponent implements OnInit {
    scales: Array<Scale>;
    @Input() formGroup: FormGroup;
    scale: number;

    constructor(
        private scaleService: ScaleService,
        private fb: FormBuilder
    ) {

    }

    ngOnInit() {
        this.formGroup.addControl('scale', this.fb.control(undefined, Validators.required));


        this.scaleService
            .findAll()
            .pipe(take(1))
            .subscribe(scales => {
                this.scales = scales;
                this.scale = 2;
            });


    }

    changeValue() {
        console.log(this.scale);
    }
}