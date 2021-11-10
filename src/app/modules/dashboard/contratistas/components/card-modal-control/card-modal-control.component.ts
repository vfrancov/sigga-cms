import { HttpErrorResponse } from "@angular/common/http";
import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { AbstractControl, FormBuilder, FormGroup, Validators } from "@angular/forms";
import { HeadQuarter } from "@app/core/models/domains/headquarter.response";
import { CONTROL } from "@app/core/models/enums/buttons";
import { ContratistasService, SedesService } from "@app/core/services/dashboard";
import { LocalstorageService } from "@app/core/services/storage/localstorage.service";
import { CardState } from "@app/stores/card/app.card.state";
import { Store } from "@ngrx/store";
import { IDropdownSettings } from "ng-multiselect-dropdown";
import { asyncScheduler } from "rxjs";

@Component({
  selector: 'app-card-modal-contratista',
  templateUrl: './card-modal-control.component.html'
})
export class CardModalContratistaComponent implements OnChanges {

  @Input() showModal: boolean;
  @Output() closeModal: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() data: any;

  creating: boolean = false;
  response: any;
  error: any;
  formControlContratista: FormGroup;
  hideResponse: boolean = false;
  selectedItems: any[] = [];
  dropdownList: Array<HeadQuarter> = [];
  dropdownSettings: IDropdownSettings = {};
  btnCreateControlUser: string = CONTROL.BUTTON_CREATE;
  btnDisableControlUser: string = CONTROL.BUTTON_DISABLE;

  constructor(private sedes: SedesService,
    private formbuilder: FormBuilder,
    private contratista: ContratistasService,
    private storage: LocalstorageService,
    private store: Store<CardState>) { }

  ngOnInit(): void {
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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']?.currentValue)
      this.initializeForm(changes['data'].currentValue);
  }

  checkState() {
    this.store.select('contratista').subscribe(data => console.log(data));
  }

  initializeForm(contratista: any) {
    this.formControlContratista = this.formbuilder.group({
      id: [contratista?.id],
      email: [contratista?.numDocument, [Validators.required]],
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

  createUserControlContratista(): void {
    this.creating = true;

    this.contratista.createContratistaControl(
      this.formControlContratista.controls['id'].value,
      this.formControlContratista.controls['passtwo'].value).subscribe((response) => {
        this.response = response;
        this.creating = false;
        this.formControlContratista.reset();
        this.selectedItems = [];
        asyncScheduler.schedule(() => this.hideResponse = true, 2500);
      }, (error: HttpErrorResponse) => {
        this.error = error;
        this.creating = false;
      })
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

  closingModalControl(): void {
    this.closeModal.emit(false);
  }

  validatePasswordEqual(formControl: AbstractControl): { match: boolean } {
    return formControl.get('passone').value === formControl.get('passtwo').value ? null : { match: true };
  }
}
