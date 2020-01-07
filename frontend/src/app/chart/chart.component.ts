import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {ChartDataSets, ChartOptions} from 'chart.js';
import {BaseChartDirective, Color, Label} from 'ng2-charts';
import * as pluginAnnotations from 'chartjs-plugin-annotation';
import {HttpClient} from '@angular/common/http';

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.scss']
})
export class ChartComponent implements OnInit, OnDestroy {
	public lineChartData: ChartDataSets[] = [
		{data: [], label: 'Temperature'},
		{data: [], label: 'Humidity', yAxisID: 'y-axis-1'}
	];
	public lineChartLabels: Label[] = [];
	public lineChartOptions: (ChartOptions & { annotation: any }) = {
		responsive: true,
		scales: {
			// We use this empty structure as a placeholder for dynamic theming.
			xAxes: [{}],
			yAxes: [
				{
					id: 'y-axis-0',
					position: 'left',
				},
				{
					id: 'y-axis-1',
					position: 'right',
					gridLines: {
						color: 'rgba(255,0,0,0.3)',
					},
					ticks: {
						fontColor: 'red',
					}
				}
			]
		},
		annotation: {
			annotations: [
				{
					type: 'line',
					mode: 'vertical',
					scaleID: 'x-axis-0',
					value: 'March',
					borderColor: 'orange',
					borderWidth: 2,
					label: {
						enabled: true,
						fontColor: 'orange',
						content: 'LineAnno'
					}
				},
			],
		},
	};
	public lineChartColors: Color[] = [
		{ // dark grey
			backgroundColor: 'rgba(77,83,96,0.2)',
			borderColor: 'rgba(77,83,96,1)',
			pointBackgroundColor: 'rgba(77,83,96,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(77,83,96,1)'
		},
		{ // red
			backgroundColor: 'rgba(255,0,0,0.3)',
			borderColor: 'red',
			pointBackgroundColor: 'rgba(148,159,177,1)',
			pointBorderColor: '#fff',
			pointHoverBackgroundColor: '#fff',
			pointHoverBorderColor: 'rgba(148,159,177,0.8)'
		}
	];
	public lineChartLegend = true;
	public lineChartType = 'line';
	public lineChartPlugins = [pluginAnnotations];
	@ViewChild(BaseChartDirective, {static: true}) chart: BaseChartDirective;

	rs: DataRealtime[] = [];
	realtimeInterval: number;
	INTERVAL = 10000;

	constructor(private http: HttpClient) {
	}

	ngOnInit() {
		this.getDataRealtime();
		this.realtimeInterval = setInterval(() => {
			this.getDataRealtime();
			console.log(this.rs);
		}, this.INTERVAL);
	}

	ngOnDestroy() {
		clearInterval(this.realtimeInterval);
	}

	getDataRealtime() {
		this.http.get<DataRealtime[]>('/api/data-realtime').subscribe(rs => {
			if (!!rs) {
				this.rs = rs.length > 60 ? rs.slice(rs.length - 61) : rs;
				this.lineChartLabels = rs.map(x => x.date + ', ' + x.time);
				this.lineChartData[0].data = rs.map(x => x.temperature);
				this.lineChartData[1].data = rs.map(x => x.humidity);
			}
		});
	}

	refresh() {

	}
}

interface DataRealtime {
	id: number;
	temperature: number;
	humidity: number;
	time: string;
	date: string;
}
