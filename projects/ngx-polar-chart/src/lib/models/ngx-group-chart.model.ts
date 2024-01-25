export interface NgxChart<T> {
  key: T;
  value: number;
}

export interface NgxGroups<T> {
  name: string;
  items: NgxChart<T>[];
}

export interface NgxDateGroup {
  groups: NgxGroups<Date>[];
  groupBy?: NgxGroupBy;
}

export interface NgxSeriesGroup {
  groups: NgxGroups<string>[];
}

export enum NgxGroupBy {
  day,
  month,
  year,
}

export type NgxChartData = NgxDateGroup | NgxSeriesGroup;
