import { Component, Input, OnInit } from '@angular/core';
import { LocalstorageService } from '@app/core/services/storage/localstorage.service';

@Component({
	selector: 'app-contratistas',
	templateUrl: './contratistas.component.html',
	styleUrls: ['./contratistas.component.scss']
})
export class ContratistasComponent implements OnInit {

	@Input() titleCard: string;
  page: number = 0;
  counter: number = 1;
  filter: string;

  constructor(private storage: LocalstorageService) { }

  ngOnInit() {
    this.getPages();
  }

  getPages() {
    this.page = Number(this.storage.getData('pageContratistas'));
  }

  next() {
    if (this.counter === this.page)
      return;

    this.counter++;
  }

  prev() {
    if (this.counter === 1)
      return;

    this.counter--;
  }

}
