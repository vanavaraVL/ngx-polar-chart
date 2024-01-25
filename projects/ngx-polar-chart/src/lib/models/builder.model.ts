import * as d3 from 'd3';
import {ChartDataModel, ChartDataSettingsModel} from './chart.model';
import {NgxPolarChartSettings} from './ngx-group-chart-settings.model';

export interface BuilderModel {
  svg: d3.Selection<SVGSVGElement, unknown, null, undefined>;
  data: ChartDataModel[];
  chartSettings: NgxPolarChartSettings;
  chartDataSettings: ChartDataSettingsModel;
}

export interface BuilderGroupedDateItemModel {
  key: string;
  value: number;
  group: string;
  dayOfWeek?: number;
}
