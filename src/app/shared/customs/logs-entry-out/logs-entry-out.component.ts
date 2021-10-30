import { HttpErrorResponse } from '@angular/common/http';
import { AfterViewInit, Component, Input, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Filter } from '@app/core/models/domains/office.interface';
import { ContratistaEntryExit, EmployeeEntryExit, VisitorsEntryExit } from '@app/core/models/domains/visitors.interface';
import { MonitorService } from '@app/core/services/control';
import { CoreService, SocketService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';
import { startWith } from 'rxjs';

@Component({
  selector: 'app-logs-entry-out',
  templateUrl: './logs-entry-out.component.html',
  styleUrls: ['./logs-entry-out.component.scss']
})
export class LogsEntryOutComponent implements OnInit, OnChanges, AfterViewInit {

  @Input() typeControl: string;
  @Input() service: string;
  @Input() fields: any = [];
  @Input() paginator: number;

  logsEntryExitEmployees: Array<EmployeeEntryExit> = [];
  logsEntryExitVisitors: Array<VisitorsEntryExit> = [];
  logsEntryExitContratistas: Array<ContratistaEntryExit> = []

  defaultFilter: Filter = {
    page: 0,
    rows: 50,
    download: false,
    devices: false,
    sort: [{ field: "id", dir: "desc" }],
    order: "desc"
  };

  error: any;
  response: any;

  formSearch: FormGroup = new FormGroup({
    search: new FormControl('')
  });

  constructor(
    private core: CoreService,
    private monitor: MonitorService,
    private storage: LocalstorageService,
    private socket: SocketService) { }

  ngOnInit() {
    if (this.checkInputs())
      this.logsEntryExitEmployees = [];
    else
      this.initComponent();

    this.checkEvent('iopersonal');
    this.checkEvent('iovisitantes');
    this.checkEvent('iocontratistas');
  }

  ngOnChanges(current: SimpleChanges): void {
    if (current['paginator']?.currentValue) {
      this.getPaginationData(current['paginator'].currentValue);
    }
  }

  ngAfterViewInit(): void {
    this.formSearch.controls['search'].valueChanges.pipe(startWith('')).subscribe((value) => {
      if (value === "")
        this.initComponent();

      switch (this.typeControl) {
        case 'visitors':
          this.logsEntryExitVisitors = this.logsEntryExitVisitors.filter(visitor => visitor.fullName.toLowerCase().includes(value));
          break;

        case 'employee':
          this.logsEntryExitEmployees = this.logsEntryExitEmployees.filter(employee => employee.nameEmployee.toLowerCase().includes(value));
          break;

        case 'contratistas':
          this.logsEntryExitContratistas = this.logsEntryExitContratistas.filter(employee => employee.fullName.toLowerCase().includes(value));
          break;
      }
    });
  }

  checkEvent(event) {
    this.socket.on(event).subscribe((data) => {
      this.initComponent();
    });
  }

  checkInputs(): boolean {
    return (this.core.isEmptyOrNull(this.typeControl) || this.core.isEmptyOrNull(this.service)) ? true : false;
  }

  initComponent() {
    this.getLogsEmployees();
  }

  getLogsEmployees() {
    this.monitor.readEmployees(this.defaultFilter, this.service).subscribe((response) => {
      switch (this.typeControl) {
        case 'employee':
          this.logsEntryExitEmployees = response.body.list;
          this.storage.setData('pageEmployee', response.body.pages);
          break;
        case 'visitors':
          this.logsEntryExitVisitors = response.body.list;
          this.storage.setData('pageVisitor', response.body.pages);
        case 'contratistas':
          this.logsEntryExitContratistas = response.body.list;
          this.storage.setData('pageContratistas', response.body.pages);
          break;
      }
    }, (error: HttpErrorResponse) => {
      this.error = error;
    });
  }

  getPaginationData(page: number): void {
    let request: Filter = {
      page: 0,
      rows: 50,
      download: false,
      devices: false,
      sort: [{ field: "id", dir: "desc" }],
      order: "desc"
    }

    this.monitor.readEmployees(request, this.service).subscribe((response) => {
      switch (this.typeControl) {
        case 'employee':
          this.logsEntryExitEmployees = response.body.list;
          this.storage.setData('pageEmployee', response.body.pages);
          break;
        case 'visitors':
          this.logsEntryExitVisitors = response.body.list;
          this.storage.setData('pageVisitor', response.body.pages);
        case 'contratistas':
          this.logsEntryExitContratistas = response.body.list;
          this.storage.setData('pageContratistas', response.body.pages);
          break;
      }
    }, (error: HttpErrorResponse) => {
      this.error = error;
    });
  }
}
