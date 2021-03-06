import { HttpErrorResponse, HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { FormEmployee } from '@app/core/models/domains/employee.interface';
import { EMPLEADOS } from '@app/core/models/enums/buttons';
import { CoreService, EmployeesService } from '@app/core/services/dashboard';
import { CardState } from '@app/stores/card/app.card.state';
import { reloadList } from '@app/stores/card/card.actions';
import { Store } from '@ngrx/store';
import { FormBuilderTypeSafe, FormGroupTypeSafe } from 'angular-typesafe-reactive-forms-helper';

@Component({
  selector: 'app-card-edit-empleado',
  templateUrl: './card-edit-empleado.component.html',
  styleUrls: ['./card-edit-empleado.component.scss']
})
export class CardEditEmpleadoComponent implements OnInit {

  @Output() closeEditFormEmployee = new EventEmitter();

  btnCreateEmployee: string = EMPLEADOS.BUTTON_EDIT;

  frmEditEmployee: FormGroupTypeSafe<FormEmployee>;
  idEmployee: number = 0;
  isAuthorizer: boolean = false;
  isFloating: boolean = false;
  saving: boolean = false;
  eps: number = 0;
  arl: number = 0;
  hideMessage: boolean = false;
  isFloatingToggle: boolean = false;

  response: HttpResponse<any>;
  error: HttpErrorResponse;

  constructor(
    private store: Store<CardState>,
    private empleado: EmployeesService,
    private core: CoreService,
    private formBuilder: FormBuilderTypeSafe) { }

  ngOnInit() {
    this.initializeForm();
    this.setDataFormEmployee();
  }

  initializeForm() {
    this.frmEditEmployee = this.formBuilder.group<FormEmployee>({
      typeDocumentsId: new FormControl('', [Validators.required]),
      numDocument: new FormControl('', [Validators.required]),
      fname: new FormControl('', [Validators.required]),
      lname: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      address: new FormControl('', [Validators.required]),
      phoneNumber: new FormControl('', [Validators.required]),
      officesId: new FormControl('', [Validators.required]),
      arlId: new FormControl('', [Validators.required]),
      epsId: new FormControl('', [Validators.required]),
      isAuthorizer: new FormControl(0, [Validators.required]),
      StatusId: new FormControl(1, []),
      isFloating: new FormControl(0)
    });
  }

  setDataFormEmployee() {
    this.store.select('showDetailsEmployee').subscribe((data) => {
      this.idEmployee = data.payload.id;
      this.frmEditEmployee.controls.typeDocumentsId.setValue(data.payload.typeDocumentsId);
      this.frmEditEmployee.controls.numDocument.setValue(data.payload.numDocument);
      this.frmEditEmployee.controls.fname.setValue(data.payload.firstName);
      this.frmEditEmployee.controls.lname.setValue(data.payload.lastName);
      this.frmEditEmployee.controls.email.setValue(data.payload.email);
      this.frmEditEmployee.controls.address.setValue(data.payload.address);
      this.frmEditEmployee.controls.phoneNumber.setValue(data.payload.phoneNumber);
      this.frmEditEmployee.controls.officesId.setValue(data.payload.officeId);
      this.frmEditEmployee.controls.arlId.setValue(data.payload.arlId);
      this.frmEditEmployee.controls.epsId.setValue(data.payload.epsId);
      this.frmEditEmployee.controls.isAuthorizer.setValue(data.payload.isAuthorizer);
      this.frmEditEmployee.controls.isFloating.setValue(data.payload.isFloating);
      this.isFloatingToggle = (data.payload.isFloating) ? true : false;
    });
  }

  closeFormEdit() {
    this.closeEditFormEmployee.emit(false);
  }

  enableAuthorizer() {
    this.isAuthorizer = (this.isAuthorizer) ? true : false;
  }

  setIsAuthorizer() {
    if (this.isAuthorizer)
      this.frmEditEmployee.controls.isAuthorizer.setValue(1);
    else
      this.frmEditEmployee.controls.isAuthorizer.setValue(0);
  }

  setIsFloating(): void {
    return (this.isFloatingToggle) ?
      this.frmEditEmployee.controls.isFloating.setValue(1) :
      this.frmEditEmployee.controls.isFloating.setValue(0);
  }

  editEmpleado() {
    this.btnCreateEmployee = EMPLEADOS.BUTTON_PROGRESS_UPDATE;
    this.saving = true;
    this.setIsAuthorizer();
    this.setIsFloating();

    this.empleado.editEmployee(this.frmEditEmployee.value, this.idEmployee).subscribe((data) => {
      if (data.status === statusCode.NO_CONTENT)
        this.response = data;

      this.btnCreateEmployee = EMPLEADOS.BUTTON_EDIT;
      this.saving = false;

      this.core.removeMessage(2500).then((status) => {
        this.hideMessage = status;
      })

      this.store.dispatch(reloadList({ status: true, card: 'lists' }));

    }, (error: HttpErrorResponse) => {
      this.error = error;
      this.btnCreateEmployee = EMPLEADOS.BUTTON_EDIT;
      this.saving = false;
    });
  }

  enableFloating(): void {
    this.isFloatingToggle = !this.isFloatingToggle;
  }
}
