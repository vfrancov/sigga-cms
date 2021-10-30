import { HttpResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Companie } from '@app/core/models/domains/companie.interface';
import { CompanyService } from '@app/core/services/dashboard';

@Component({
  selector: 'app-card-detalle-oficinas',
  templateUrl: './card-detalle-oficinas.component.html',
  styleUrls: ['./card-detalle-oficinas.component.scss']
})
export class CardDetalleOficinasComponent implements OnInit {

  @Input() offices: number = 0;
  @Output() modalVisits = new EventEmitter();
  @Output() modalIo = new EventEmitter();
  companieDetails: Companie;
  isOpenModal: boolean;

  constructor(private companie: CompanyService) { }

  ngOnInit() {
    this.setCompanieDetails();
  }

  setCompanieDetails() {
    this.companie.getDetailsCompany().subscribe((response: HttpResponse<Array<Companie>>) => {
      this.companieDetails = response[0];
    }, (error) => {
      console.log(error);
    });
  }

  showModalVisits() {
    this.modalVisits.emit(true);
  }

  showModalIo() {
    this.modalIo.emit(true);
  }

  toggleModal(): void {
    this.isOpenModal = !this.isOpenModal;
  }
}
