export interface NgxPolarChartSettings {
  width?: number;
  height?: number;
  fontSettings?: NgxPolarChartFontSettings;
  showToolTip?: boolean;
  barsSettings?: NgxPolarChartBarSettings;
  labelSettings?: NgxPolarChartLabelSettings;
  tickSettings?: NgxPolarChartTickSettings;
  showLegend?: boolean;
  locale?: string;
}

export interface NgxPolarChartFontSettings {
  fontFamily?: string;
  fontSize?: number;
}

export interface NgxPolarChartBarSettings {
  groupColors?: string[];
  weekend?: NgxPolarChartColorSettings;
  average?: NgxPolarChartColorSettings;
  maximum?: NgxPolarChartColorSettings;
  minimum?: NgxPolarChartColorSettings;
}

export interface NgxPolarChartColorSettings {
  showColorBar?: boolean;
  color?: string;
}

export interface NgxPolarChartLabelSettings {
  showWeekDays?: boolean;
  showWeekEndDays?: boolean;
}

export interface NgxPolarChartTickSettings {
  showTicks?: boolean;
  showTicksLabels?: boolean;
}
