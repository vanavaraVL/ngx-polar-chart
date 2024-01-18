import {NgModule} from '@angular/core';
import {NgxPolarChartGroupDateComponent} from './ngx-polar-chart-group-date/ngx-polar-chart-group-date.component';
import {NgxPolarChartGroupSeriesComponent} from './ngx-polar-chart-group-series/ngx-polar-chart-group-series.component';

@NgModule({
  declarations: [NgxPolarChartGroupDateComponent, NgxPolarChartGroupSeriesComponent],
  imports: [],
  exports: [NgxPolarChartGroupDateComponent, NgxPolarChartGroupSeriesComponent],
})
export class NgxPolarChartGroupModule {}
