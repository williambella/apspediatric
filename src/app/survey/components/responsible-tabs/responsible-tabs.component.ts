import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatTabGroup } from '@angular/material/tabs';

@Component({
  selector: 'app-responsible-tabs',
  templateUrl: './responsible-tabs.component.html',
  styles: []
})
export class ResponsibleTabsComponent implements OnInit {
  @ViewChild('matTabGroup', { static: false }) matTabGroup: MatTabGroup;
  @Input() formGroup: FormGroup;

  constructor() { }

  ngOnInit() {
  }

  selectTabChange(selectedIndex: number): void {
    this.matTabGroup.selectedIndex = selectedIndex;
  }

}
