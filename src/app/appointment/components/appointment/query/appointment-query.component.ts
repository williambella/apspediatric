import { Component } from '@angular/core';
import { Patient } from '@responsible/models/patient';

@Component({
    selector: 'app-appointment-query',
    templateUrl: 'appointment-query.component.html',
    styleUrls: ['appointment-query.component.scss']
})

export class AppointmentQueryComponent{
  
    doSearch = (patient: Patient) => {
        console.log(patient);
    }
}