import { Component, OnInit, Input, ViewChild, TemplateRef, Directive, ContentChild, Output, EventEmitter, ContentChildren, AfterContentInit } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
import { PeriodicElement } from '@appointment/questions/question-list/question-list.component';
import { MatTableDataSource } from '@angular/material/table';

@Directive({selector: '[appBtnActions]'})
export class BtnActionsDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({selector: '[appTableHeader]'})
export class TableHeaderDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}

@Directive({selector: '[appTableColumns]'})
export class TableColumnsDirective {
  constructor(public templateRef: TemplateRef<any>) { }
}


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit, AfterContentInit {
  dataSource: MatTableDataSource<any>;

  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
  }

  // @Input() data: Array<any>;

  matHeaderRowDef: Array<any> = [];

  @Input()
  columns: Array<string>;

  @Input()
  edit = false;

  @Input()
  delete = false;

  @Input()
  toggle = false;

  @Input()
  radio = false;

  @Output()
  editEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  deleteEmitter: EventEmitter<any> = new EventEmitter<any>();

  @Output()
  toggleEmitter: EventEmitter<any> = new EventEmitter<any>();

  @ViewChild(MatSort, {static: true})
  sort: MatSort;

  @ContentChild(BtnActionsDirective, { static: true })
  btnActions: BtnActionsDirective;

  @ContentChildren(TableHeaderDirective, { read: TemplateRef })
  tableHeaders: TableHeaderDirective;

  @ContentChildren(TableColumnsDirective, { read: TemplateRef })
  tableColumns: TableColumnsDirective;

  selection = new SelectionModel<PeriodicElement>(true, []);

  initialSelection = [];
  allowMultiSelect = true;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  ngAfterContentInit() {
    // this.tableColumns.toArray().map((a: any, index: number) => {
    //   return console.log(a);
    // });

    // this.matHeaderRowDef = this.tableHeaders.toArray().map((_, i) => `column-${i}`);
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ? this.selection.clear() : this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

}
