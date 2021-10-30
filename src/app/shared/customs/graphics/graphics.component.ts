import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { statusCode } from '@app/core/constants/status.responses';
import { GRAFICAS } from '@app/core/models/enums/buttons';
import { GraphicsService } from '@app/core/services/dashboard';
import * as CanvasJS from '../../../../assets/js/canvasjs';

@Component({
	selector: 'app-graphics',
	templateUrl: './graphics.component.html',
	styles: []
})
export class GraphicsComponent implements OnInit {

	@Input() title: string;
	@Input() container: string;
	@Input() endpoint: string;

	dataChart: Array<any> = [];
	frmFilterGraphics: FormGroup;
	btnFilter: string = GRAFICAS.BUTTON_FILTER;

	constructor(private graphics: GraphicsService, private formbuilder: FormBuilder) { }

	ngOnInit() {
		this.getDataChart("2021-04-01 / 2021-04-10");
		this.initializeForm();
		setTimeout(() => this.setChart(this.container, this.title, this.dataChart), 1000);
	}

	initializeForm() {
		this.frmFilterGraphics = this.formbuilder.group({
			from: ['', [Validators.required]],
			to: ['', [Validators.required]]
		});
	}

	getDataChart(filterDate:string) {
		this.graphics.entrysChart(this.endpoint, { page: 0, rows: 200, download: false, filterDate: filterDate }).subscribe((response) => {
			if (response.status === statusCode.SUCCESS)
				this.transformData(response.body.list);
		});
	}

	transformData(data: Array<any>) {
		data.forEach((element) => {
			let buildData = {
				y: element.total,
				label: element.dateItem || element.hoursItem || element.officeName
			}

			this.dataChart.push(buildData);
		});
	}

	setChart(container: string, title: string, data: any) {
		let chart = new CanvasJS.Chart(container, {
			theme: "light2",
			animationEnabled: true,
			exportEnabled: true,
			title: {
				text: title
			},
			data: [{
				type: "column",
				dataPoints: this.dataChart
			}]
		});

		chart.render();
	}

	makeFilter() {
		console.log(this.frmFilterGraphics.value, this.container);
		let filterDate = this.frmFilterGraphics.get('from').value + " / " + this.frmFilterGraphics.get('to').value;
		this.getDataChart(filterDate);
		setTimeout(() => this.setChart(this.container, this.title, this.dataChart), 1000);
	}
}
