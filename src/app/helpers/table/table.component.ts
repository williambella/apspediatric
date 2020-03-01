import { Component, OnInit, Input, ViewChild, TemplateRef, Directive, ContentChild, Output, EventEmitter, ContentChildren } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { SelectionModel } from '@angular/cdk/collections';
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

export interface TableHeader {
  title: string;
  field: string;
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {
  dataSource: MatTableDataSource<any>;
  headersLabels: Array<string>;
  defaultHeadersValues: Array<TableHeader>;

  @Input() set headers(headers: Array<TableHeader>) {
    this.headersLabels = headers.map((header: TableHeader) => header.title);
    this.defaultHeadersValues = headers;
  }

  @Input() set data(data: Array<any>) {
    this.dataSource = new MatTableDataSource(data);
  }

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

  selection = new SelectionModel<any>(true, []);

  initialSelection = [];
  allowMultiSelect = true;

  constructor() { }

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  columnField(column: string): string {
    return this.defaultHeadersValues.find((header: TableHeader) => header.title === column).field;
  }
}
