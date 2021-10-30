import { Component, forwardRef, Input, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { Combo } from '@app/core/models/domains/combo.interface';
import { EmployeesService } from '@app/core/services/dashboard';

@Component({
	selector: 'app-combobox',
	templateUrl: './combobox.component.html',
	styleUrls: ['./combobox.component.scss'],
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => ComboboxComponent),
			multi: true
		}
	]
})
export class ComboboxComponent implements OnInit, ControlValueAccessor {

	@Input() endpoint: string;
	@Input() name: string;
	@Input() label: string;
	@Input() combosm: boolean = false;

	comboData: Array<Combo> = [];

	value: string;
	onChange: (event) => void;
	onTouched: () => void;
	disabled: boolean;

	constructor(private employee: EmployeesService) { }

	ngOnInit() {
		this.populateCombo();
	}

	populateCombo() {
		this.employee.combos(this.endpoint).subscribe((response) => {
			this.comboData = response;
		}, (error) => {
			this.comboData.push({
				id: 0,
				prop: 'No se encontraron registros'
			});
		});
	}

	writeValue(value: string): void {
		this.value = value ? value : '';
	}

	registerOnChange(fn: any): void {
		this.onChange = fn;
	}

	registerOnTouched(fn: any): void {
		this.onTouched = fn;
	}

	setDisabledState(isDisabled: boolean): void {
		this.disabled = isDisabled;
	}
}
