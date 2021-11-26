import { ChangeDetectorRef, Component, DoCheck, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from "@angular/core";
import { FormControl } from "@angular/forms";

@Component({
  selector: 'multiselect',
  templateUrl: './multiselect.component.html',
  styleUrls: ['./multiselect.component.scss'],
  host: {
    class: 'multiselect'
  }
})
export class MultiselectComponent implements OnInit, OnChanges {

  @Input() label: string;
  @Input() elements: Array<any>;
  @Input() clear: boolean;
  @Output() pushSelectedElements = new EventEmitter<any>();

  selectedElements: Array<any> = [];
  searchElements: FormControl = new FormControl('');
  myElements: Array<any> = [];
  openPanel: boolean = true;

  constructor(private changeDetection: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.myElements = this.elements;
    this.makeSearchFilter();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['clear']?.currentValue)
      this.uncheckedAll(this.selectedElements);
  }

  uncheckedAll(checkboxes: Array<any>): void {
    checkboxes.map(element => {
      let getElement: any = document.querySelector(`#item-${element.id}`);
      getElement.checked = false;
    });

    this.selectedElements = [];
  }

  selectElementFromList(item: any): void {
    if (this.isRelatedInElements(item))
      this.removeFromSelectedItems(item);
    else {
      this.selectedElements.push(item);
      this.pushSelectedElements.emit(this.selectedElements.map(item => item.id));
    }
  }

  removeFromSelectedItems(item: any): void {
    this.selectedElements.splice(this.selectedElements.findIndex(element => element.id === item.id), 1);
    this.pushSelectedElements.emit(this.selectedElements.map(item => item.id));
  }

  isRelatedInElements(item: any): boolean {
    return this.selectedElements.some(element => element.id === item.id);
  }

  makeSearchFilter(): void {
    this.searchElements.valueChanges.subscribe((value: string) => {
      if (value === '')
        this.elements = this.myElements;
      else
        this.elements = this.elements.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()))
    });
  }

  openElementPanel(): void {
    this.openPanel = false;
  }

  closeElementPanel(): void {
    this.openPanel = true;
  }

  cancelProcess(): void {
    this.closeElementPanel();
    this.uncheckedAll(this.selectedElements);
  }
}
