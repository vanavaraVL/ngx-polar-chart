export interface GroupDataSetModel {
  settings: GroupDataSettingsModel;
  data: GroupDataModel[];
}

export interface GroupDataSettingsModel {
  keys: string[];
  keyColors: string[];
}
export interface GroupDataModel {
  key: string;
  dayOfWeek?: number;
  dayOfWeekName?: string;
}

export interface StorageEntity {
  values: number[];
  additionInfo?: StorageEntityAdditionInfo;
}

export interface StorageEntityAdditionInfo {
  dayOfWeek?: number;
  dayOfWeekName?: string;
}
