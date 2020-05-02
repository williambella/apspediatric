import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Procedure } from '@appointment/models/Procedure';
import { ProcedureService } from '@appointment/services/procedure.service';
import { take } from 'rxjs/operators';

@Component({
    selector: 'app-appointment-create-procedure',
    templateUrl: 'appointment-create-procedure.component.html'
})

export class AppointmentCreateProcedureComponent implements OnInit {
    procedureList: Array<Procedure>;
    @Input() formGroup: FormGroup;
    formProcedureName = 'procedures';

    constructor(
        private procedureService: ProcedureService,
        private fb: FormBuilder
    ) {
    }

    ngOnInit() {
        this.formGroup.addControl(this.formProcedureName, this.fb.control('', Validators.required));

        this.procedureService
            .getAll()
            .pipe(take(1))
            .subscribe(procedures => this.procedureList = procedures);
    }
}