import { Component, OnInit, Input } from '@angular/core';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-responsible-tabs',
  templateUrl: './responsible-tabs.component.html',
  styles: []
})
export class ResponsibleTabsComponent implements OnInit {
  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

}
