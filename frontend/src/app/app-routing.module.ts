import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';


const routes: Routes = [
	{path: '', redirectTo: 'chart', pathMatch: 'full'},
	{path: 'chart', loadChildren: () => import('./chart/chart.module').then(m => m.ChartModule)}
];

@NgModule({
	imports: [RouterModule.forRoot(routes)],
	exports: [RouterModule]
})
export class AppRoutingModule {
}
