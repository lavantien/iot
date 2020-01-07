import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ChartsModule} from 'ng2-charts';
import {HttpClientModule} from '@angular/common/http';

@NgModule({
	declarations: [],
	imports: [
		CommonModule,
		ChartsModule,
		HttpClientModule
	],
	exports: [
		ChartsModule,
		HttpClientModule
	]
})
export class SharedModule {
}
