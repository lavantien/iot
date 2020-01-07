import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ChartRoutingModule} from './chart-routing.module';
import {ChartComponent} from './chart.component';
import {SharedModule} from '../shared.module';


@NgModule({
	declarations: [ChartComponent],
	imports: [
		CommonModule,
		ChartRoutingModule,
		SharedModule
	]
})
export class ChartModule {
}
