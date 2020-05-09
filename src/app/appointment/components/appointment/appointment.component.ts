import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Patient } from '@responsible/models/patient';
import { Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
import { AppointmentService } from '@appointment/services/appointment.service';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnDestroy, OnInit {
  patient: Patient;
  appointments: any;
  selectedPatientId: string;
  title = 'Query Appointments';
  routeSub: Subscription;
  baseRoute = 'management/appointment';
  showNewButton = true;
  showRecentAppointments = false;

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.routeSub = activatedRoute.url.subscribe(() => {
      if (activatedRoute.snapshot.firstChild) {

        const data = activatedRoute.snapshot.firstChild.data;
        this.title = data.title;
        this.showNewButton = data.showNewButton;
        this.showRecentAppointments = data.showRecent;

      } else {
        this.showNewButton = true;
        this.showRecentAppointments = true;

      }

    });

    if (this.activatedRoute.children
      && this.activatedRoute.children.length > 0) {

      this.activatedRoute.children[0].params
        .pipe(take(1))
        .subscribe(params => this.selectedPatientId = params.id);
    }
  }

  ngOnInit() {

  }

  doSelect = (patient: Patient) => {
    this.patient = patient;
    this.navigateToQuery();
  }

  onNew = () => {
    this.router.navigate([`${this.baseRoute}/${this.patient.id}/new`]);
  }

  onBack = () => {
    this.navigateToQuery();
  }

  private navigateToQuery() {
    this.router.navigate([`${this.baseRoute}/${this.patient.id}`]);
  }

  ngOnDestroy() {
    this.routeSub.unsubscribe();
  }
}
