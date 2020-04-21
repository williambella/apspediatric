import { Component, OnInit, Input } from '@angular/core';
import { TreatmentService } from '@appointment/services/treatment.service';
import { ToothService } from '@appointment/services/tooth.service';
import { Treatment } from '@appointment/models/Treatment';
import { Tooth } from '@appointment/models/Tooth';
import { take, map } from 'rxjs/operators';
import { FormGroup, FormBuilder, FormArray, Validators } from '@angular/forms';

@Component({
    selector: 'app-appointment-create-treatment',
    templateUrl: 'appointment-create-treatment.component.html'
})

export class AppointmentCreateTreatmentComponent implements OnInit {
    teeth: Array<Tooth>;
    treatmentList: Array<Treatment>;
    @Input() formGroup: FormGroup;
    formArrayName = 'treatments';

    constructor(
        private toothService: ToothService,
        private treatmentService: TreatmentService,
        private fb: FormBuilder
    ) { }

    ngOnInit() {
        this.formGroup.addControl(this.formArrayName, this.fb.array([this.newTreatment()]));

        this.toothService
            .getAll()
            .pipe(
                take(1),
                map(teeth => teeth.sort((tooth1, tooth2) => tooth1.number - tooth2.number)))
            .subscribe(teeth => this.teeth = teeth);

        this.treatmentService
            .getAll()
            .pipe(take(1))
            .subscribe(treatmentList => this.treatmentList = treatmentList);
    }

    private newTreatment(): any {
        return this.fb.group({
            treatment: ['', Validators.required],
            teeth: ['', Validators.required]
        });
    }

    get treatmentFormArray() {
        return this.formGroup.get(this.formArrayName) as FormArray;
    }

    removeTreatment(index: number) {
        this.treatmentFormArray.removeAt(index);
    }

    addTreatment() {
        this.treatmentFormArray.push(this.newTreatment());
    }
}