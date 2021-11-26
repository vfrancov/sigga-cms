import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { DataEmployee } from '@app/core/models/domains/employee.interface';
import { HeadQuarter } from '@app/core/models/domains/headquarter.response';
import { CONTROL } from '@app/core/models/enums/buttons';
import { EmployeesService, SedesService } from '@app/core/services/dashboard';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';
import { CardState } from '@app/stores/card/app.card.state';
import { reloadList } from '@app/stores/card/card.actions';
import { Store } from '@ngrx/store';
import { IDropdownSettings } from 'ng-multiselect-dropdown';
import { UserInfo } from 'os';
import { asyncScheduler } from 'rxjs';

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
  btnDisableControlUser: string = CONTROL.BUTTON_DISABLE;
  creating: boolean = false;
  residential: boolean = false;
  hideResponse: boolean = false;
  clearComponent: boolean =  false;

  error: any;
  response: any;

  constructor(
    private sedes: SedesService,
    private formbuilder: FormBuilder,
    private employe: EmployeesService,
    private storage: LocalstorageService,
    private store: Store<CardState>
  ) { }

  ngOnInit() {
    this.checkState();
    this.getSedes();
    this.initializeForm(this.data);
    this.isUserCompany();

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
      console.log(data.payload);
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
    }, { validators: this.validatePasswordEqual });
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
    this.selectedItems = [...event];
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
            this.employe.associateSedeControl(this.data.id, this.selectedItems).subscribe((response) => {
              if (response.status === statusCode.SUCCESS)
                this.response = response;

              this.response = response;
              asyncScheduler.schedule(() => this.hideResponse = true, 2500);
              this.selectedItems = [];
              this.clearComponent = true;
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
    return sedes.map(element => element.id);
  }

  isUserCompany(): void {
    const user = this.storage.getData('us');

    if (!user?.isResidential)
      this.residential = true;
  }

  validatePasswordEqual(formControl: AbstractControl): { match: boolean } {
    return formControl.get('passone').value === formControl.get('passtwo').value ? null : { match: true };
  }
}
