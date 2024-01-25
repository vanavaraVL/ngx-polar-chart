export interface ChartDataSetModel {
  settings: ChartDataSettingsModel;
  data: ChartDataModel[];
}

export interface ChartDataSettingsModel {
  keys: string[];
  keyColors: string[];
}
export interface ChartDataModel {
  key: string;
  dayOfWeek?: number;
  dayOfWeekName?: string;
}

export interface ChartStorageEntityModel {
  values: number[];
  additionInfo?: ChartStorageAdditionInfoModel;
}

export interface ChartStorageAdditionInfoModel {
  dayOfWeek?: number;
  dayOfWeekName?: string;
}
