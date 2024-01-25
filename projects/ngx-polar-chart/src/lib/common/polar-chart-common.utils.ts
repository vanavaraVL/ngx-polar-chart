import {ChartDataModel} from '../models/chart.model';
import {NgxChartData, NgxDateGroup, NgxSeriesGroup} from '../models/ngx-group-chart.model';

export function isNgxDate(chartData: NgxChartData): chartData is NgxDateGroup {
  if (!chartData) return false;

  const obj = chartData as NgxDateGroup;

  if (!obj) {
    return false;
  }

  return (
    Array.isArray(obj.groups) &&
    obj.groups
      .map((g) => g.items)
      .reduce(function (a, b) {
        return a.concat(b);
      }, [])
      .every((t) => t.key instanceof Date)
  );
}

export function isNgxString(chartData: NgxChartData): chartData is NgxSeriesGroup {
  if (!chartData) return false;

  const obj = chartData as NgxSeriesGroup;

  if (!obj) {
    return false;
  }

  return (
    Array.isArray(obj.groups) &&
    obj.groups
      .map((g) => g.items)
      .reduce(function (a, b) {
        return a.concat(b);
      }, [])
      .every((t) => typeof t.key === 'string')
  );
}

export function isDataEmpty(data: ChartDataModel[]): boolean {
  return data.length === 0;
}
