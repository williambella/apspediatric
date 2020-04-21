import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Patient } from '@responsible/models/patient';
import { PatientService } from '@responsible/services/patient.service';
import { Observable } from 'rxjs';
import { map, startWith, take } from 'rxjs/operators';

@Component({
    selector: 'app-appointment-query-select',
    templateUrl: 'appointment-query-select.component.html'
})

export class AppointmentQuerySelectComponent implements OnInit {
    searchKey = new FormControl();
    filteredPatients: Observable<Patient[]>;
    patients: Array<Patient> = [];
    @Input() onSelect: Function;
    @Input() selectedPatientId: string;

    constructor(private patientService: PatientService) {
        this.searchKey.setValidators(Validators.required);

    }

    ngOnInit() {

        this.patientService
            .findAll()
            .pipe(take(1))
            .subscribe(patients => {
                this.patients = patients;

                if (this.selectedPatientId) {
                    this.searchKey.setValue(this.patients.find(patient => patient.id === this.selectedPatientId));
                    this.select();
                }

                this.filteredPatients = this.searchKey.valueChanges
                    .pipe(
                        startWith(''),
                        map(value => typeof value === 'string' ? value : value.name),
                        map(value => this._filter(value))
                    );
            })


    }

    private _filter(value: string): Patient[] {
        const filterValue = value.toLowerCase();

        return this.patients.filter(patient => patient.name.toLowerCase().includes(filterValue));
    }

    displayFn(patient: Patient): string {
        return patient && patient.name ? patient.name : '';
    }

    select() {
        this.onSelect(this.searchKey.value);
    }

    isValidPatient(value: any) {
        if (typeof value !== 'string' && value) {
            this.searchKey.setErrors(null);
            return true;
        }

        this.searchKey.setErrors({});
        return false;
    }
}