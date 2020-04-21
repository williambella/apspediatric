import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
    selector: 'app-appointment-create',
    templateUrl: 'appointment-create.component.html'
})

export class AppointmentCreateComponent {
    appointmentForm: FormGroup;

    constructor(private fb: FormBuilder) { 
        this.appointmentForm = this.fb.group({ description: ['', Validators.required] });
    }

    show() {
        console.log(this.appointmentForm);
    }

}