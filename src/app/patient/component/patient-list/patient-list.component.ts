import { Component, OnInit, OnDestroy } from '@angular/core';
import { Patient } from '@responsible/models/patient';
import { Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { PatientService } from '@responsible/services/patient.service';
import { DialogService, DialogConfirmAction } from '@core/services/dialog.service';
import { MessagesService } from '@core/services/messages.service';

@Component({
  selector: 'app-patient-list',
  templateUrl: './patient-list.component.html',
  styleUrls: ['./patient-list.component.css']
})
export class PatientListComponent implements OnInit, OnDestroy {

  patients: Array<Patient>;

  private arraySubscriptions: Array<Subscription> = new Array<Subscription>();

  constructor(
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private patientService: PatientService, 
    private dialogService: DialogService,
    private messageService: MessagesService
  ) { }

  ngOnInit() {
    this.findAll();
  }

  ngOnDestroy(): void {
    this.arraySubscriptions.map((subscription: Subscription) => subscription.unsubscribe());
  }

  private findAll(): void {
    const routeSubscription: Subscription = this.patientService.findAll()
    .subscribe((patient: Array<Patient>) => {
      this.patients = patient;
    }); 

    this.arraySubscriptions = [...this.arraySubscriptions, routeSubscription];
  }

  edit(patient: Patient): void {
    this.router.navigate([`./${patient.id}/edit`], {relativeTo: this.activatedRoute});
  }

  delete(patient: Patient): void {
    
    this.dialogService.confirm()
    .then((confirm: DialogConfirmAction) => {
      if (confirm.value) {
        
        const deleteSubscription: Subscription = this.patientService.delete(patient.id)
        .subscribe((patients: Array<Patient>) => {
          this.messageService.message('form.removed');
          this.findAll();
        });

        this.arraySubscriptions = [...this.arraySubscriptions, deleteSubscription];
      }
    });
  }

}
