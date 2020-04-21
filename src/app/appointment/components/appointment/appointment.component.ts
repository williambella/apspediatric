import { Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { AppointmentService } from '@appointment/services/appointment.service';
import { Patient } from '@responsible/models/patient';
import { take } from 'rxjs/operators';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnDestroy {
  patient: Patient;
  appointments: any;
  selectedPatientId: string;
  title = 'Query Appointments';
  routeSub: Subscription;
  baseRoute = 'management/appointment';
  showNewButton = true;

  constructor(
    private appointmentService: AppointmentService,
    private router: Router,
    private activatedRoute: ActivatedRoute
  ) {

    this.routeSub = activatedRoute.url.subscribe(() => {
      if (activatedRoute.snapshot.firstChild) {
        const data = activatedRoute.snapshot.firstChild.data;
        this.title = data.title;
        this.showNewButton = data.showNewButton;
      } else {
        this.showNewButton = true;
      }

    });

    if (this.activatedRoute.children
      && this.activatedRoute.children.length > 0) {

      this.activatedRoute.children[0].params
        .pipe(take(1))
        .subscribe(params => this.selectedPatientId = params.id);
    }
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
