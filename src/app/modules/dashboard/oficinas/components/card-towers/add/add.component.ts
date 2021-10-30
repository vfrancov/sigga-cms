import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HeadQuarter } from '@app/core/models/domains/headquarter.response';
import { Tower } from '@app/core/models/domains/tower.interface';
import { TORRES } from '@app/core/models/enums/buttons';
import { SedesService, TowersService } from '@app/core/services/dashboard';
import { refreshTowers, showCard } from '@app/stores/offices/actions';
import { OfficeState } from '@app/stores/offices/state';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.scss']
})
export class AddComponent implements OnInit {

  @Output() closeFormTower = new EventEmitter();

  hideCancelTorre: boolean = false;
  btnCreateTower: string = TORRES.BUTTON_CREATE;

  frmCrateTower: FormGroup;
  comboBoxSedes: Array<HeadQuarter> = [];

  error: any;
  response: any;

  constructor(
    private tower: TowersService,
    private sedes: SedesService,
    private store: Store<OfficeState>,
    private formbuilder: FormBuilder) { }

  ngOnInit() {
    this.getSedes();
    this.initializeForm();
  }

  getSedes() {
    this.sedes.getSedes().subscribe((response) => {
      this.comboBoxSedes = response.body;
    });
  }

  initializeForm() {
    this.frmCrateTower = this.formbuilder.group({
      sedesId: ['', Validators.required],
      name: ['', Validators.required]
    });
  }

  createTorre() {
    this.btnCreateTower = TORRES.BUTTON_CREATING;

    let request: Tower = {
      name: this.frmCrateTower.controls['name'].value,
      sedesId: Number(this.frmCrateTower.controls['sedesId'].value)
    };

    this.tower.createTower(request).subscribe((response) => {
      this.btnCreateTower = TORRES.BUTTON_CREATE;
      this.response = response;
      this.frmCrateTower.reset();
      this.closeFormTower.emit(false);
      this.store.dispatch(refreshTowers({ reload: true, list: 'towers' }))
    }, (error: HttpErrorResponse) => {
      this.error = error;
    });
  }

  cancelAddTorre() {
    this.closeFormTower.emit(false);
  }

  showFormTorre() {

  }

  closeTorre() {
    this.store.dispatch(showCard({ show: false, name: 'towers' }));
  }

}
