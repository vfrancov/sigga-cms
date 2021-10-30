import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { DataEmployee } from '@app/core/models/domains/employee.interface';
import { HeadQuarter } from '@app/core/models/domains/headquarter.response';
import { CONTROL } from '@app/core/models/enums/buttons';
import { EmployeesService, SedesService } from '@app/core/services/dashboard';
import { CardState } from '@app/stores/card/app.card.state';
import { reloadList } from '@app/stores/card/card.actions';
import { Store } from '@ngrx/store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';

@Component({
  selector: 'app-card-modal-control',
  templateUrl: './card-modal-control.component.html',
  styles: []
})
export class CardModalControlComponent implements OnInit {

  @Input() showModal: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() data: DataEmployee;

  frmAddControlUser: FormGroup;

  dropdownList: Array<HeadQuarter> = [];
  selectedItems: Array<HeadQuarter> = [];
  dropdownSettings: IDropdownSettings = {};
  btnCreateControlUser: string = CONTROL.BUTTON_CREATE;
  creating: boolean = false;

  error: any;
  response: any;

  constructor(
    private sedes: SedesService,
    private formbuilder: FormBuilder,
    private employe: EmployeesService,
    private store: Store<CardState>
  ) { }

  ngOnInit() {
    this.checkState();
    this.getSedes();
    this.initializeForm(this.data);

    this.dropdownSettings = {
      singleSelection: false,
      idField: 'id',
      textField: 'name',
      selectAllText: 'Seleccionar Todos',
      unSelectAllText: 'Deseleccionar',
      searchPlaceholderText: 'Buscar',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  checkState() {
    this.store.select('showDetailsEmployee').subscribe(data => {
      this.initializeForm(data.payload);
    });
  }

  initializeForm(employee: DataEmployee) {
    this.frmAddControlUser = this.formbuilder.group({
      id: [employee.id],
      email: [employee.email, [Validators.email]],
      passone: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      passtwo: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(8)]],
      isUserAdmin: [false],
      isResidential: [false]
    });
  }

  getSedes() {
    this.sedes.getSedes().subscribe((response) => {
      this.dropdownList = response.body;
    }, ((error: HttpErrorResponse) => {
      this.error = error;
    }));
  }

  closingModalControl() {
    this.closeModal.emit(false);
    this.frmAddControlUser.reset();
    this.selectedItems = [];
  }

  onItemSelect(event) {
    let existElement = this.selectedItems.some(element => element.id === event.id);

    if (!existElement)
      this.selectedItems.push(event);
  }

  onItemDeselect(event) {
    let existElement = this.selectedItems.filter(element => element.id === event.id);

    if (existElement.length > 0)
      this.selectedItems.splice(0, 1);
  }

  onSelectAll(event) {
    console.log(event);
  }

  onDeselectAll(event) {
    this.selectedItems = [];
  }

  createUserControl() {
    if (this.selectedItems.length === 0)
      return;
    else {
      this.btnCreateControlUser = CONTROL.BUTTON_PROGRESS;
      this.creating = true;
      let isResidential = (this.frmAddControlUser.controls['isResidential'].value) ? 1 : 0;

      this.employe.createUserControl(
        this.data.id,
        this.frmAddControlUser.controls['passtwo'].value,
        this.frmAddControlUser.controls['isUserAdmin'].value, isResidential).subscribe((response) => {
          if (response.status === statusCode.SUCCESS) {
            this.employe.associateSedeControl(this.data.id, this.getSelectedSedes(this.selectedItems)).subscribe((response) => {
              if (response.status === statusCode.SUCCESS)
                this.response = response;

              this.response = response;
            }, (error: HttpErrorResponse) => {
              this.error = error;
            });
          }

          this.store.dispatch(reloadList({ status: true, card: 'lists' }));
          this.frmAddControlUser.reset();

          this.response = response;
          this.btnCreateControlUser = CONTROL.BUTTON_CREATE;
          this.creating = false;
        }, (error: HttpErrorResponse) => {
          this.error = error;
          this.btnCreateControlUser = CONTROL.BUTTON_CREATE;
          this.creating = false;
        });
    }
  }

  getSelectedSedes(sedes: Array<HeadQuarter>): Array<any> {
    let elements = [];

    sedes.forEach(element => {
      elements.push(element.id);
    });

    return elements;
  }
}
