import {Injectable, ElementRef} from '@angular/core';
import {BuilderModel} from '../models/builder.model';
import * as d3 from 'd3';
import {GroupDataModel, GroupDataSettingsModel} from '../models/chart.model';
import {NgxPolarChartSettings} from '../models/ngx-group-chart-settings.model';

export interface IBuilder {
  buildChart(
    chartContainer: ElementRef | undefined,
    chartId: string,
    data: GroupDataModel[],
    plotSettings: NgxPolarChartSettings,
    chartDataSettings: GroupDataSettingsModel,
  ): void;
}

export interface IPolarChartBuilder {
  build(buildModel: BuilderModel): void;
  cleanup(): void;
}

@Injectable({
  providedIn: 'root',
})
export abstract class ChartBuilderBase implements IPolarChartBuilder {
  private readonly margin = {top: 70};

  private innerRadius: number = 180;
  private outerRadius: number | undefined;
  private maximum: number | undefined;
  private average: number | undefined;
  private minimum: number | undefined;

  private x0: d3.ScaleBand<string> | undefined;
  private y: d3.ScaleLinear<number, number, never> | undefined;
  private z: d3.ScaleOrdinal<string, unknown, never> | undefined;

  protected readonly sundayDay: number = 0;
  protected readonly saturdayDay: number = 6;

  protected getOuterRadius(buildModel: BuilderModel): number {
    if (!this.outerRadius) {
      const width = buildModel.chartSettings.width!;
      const height = buildModel.chartSettings.height!;

      this.outerRadius = Math.min(width, height) / 2 - this.margin.top;
    }

    return this.outerRadius;
  }

  protected getMaximum(buildModel: BuilderModel): number {
    if (!this.maximum) {
      this.maximum = this.getMaximumValue(buildModel);
    }

    return this.maximum;
  }

  protected getMaximumValue(buildModel: BuilderModel): number {
    const keys = buildModel.chartDataSettings.keys;

    return d3.max(buildModel.data, (d: GroupDataModel) => d3.max(keys, (k) => (d as any)[k])) || 0;
  }

  protected getAverage(buildModel: BuilderModel): number {
    if (!this.average) {
      this.average = this.getAverageValue(buildModel);
    }

    return this.average;
  }

  protected getAverageValue(buildModel: BuilderModel): number {
    const keys = buildModel.chartDataSettings.keys;

    return d3.mean(buildModel.data, (d: GroupDataModel) => d3.mean(keys, (k) => (d as any)[k])) || 0;
  }

  protected getMinimum(buildModel: BuilderModel): number {
    if (!this.minimum) {
      const keys = buildModel.chartDataSettings.keys;

      this.minimum = d3.min(buildModel.data, (d: GroupDataModel) => d3.min(keys, (k: string) => (d as any)[k]));
    }

    return this.minimum || 0;
  }

  protected getX0(buildModel: BuilderModel): d3.ScaleBand<string> {
    if (!this.x0) {
      this.x0 = d3
        .scaleBand()
        .domain(buildModel.data.map((d: GroupDataModel) => d.key))
        .range([0, 2 * Math.PI])
        .align(0);
    }

    return this.x0;
  }

  protected getY(buildModel: BuilderModel): d3.ScaleLinear<number, number, never> {
    if (!this.y) {
      const innerRadius = this.getInnerRadius(buildModel);
      const outerRadius = this.getOuterRadius(buildModel);

      const domainRange = this.getYDomain(buildModel);

      this.y = d3.scaleLinear().domain([0, domainRange]).range([innerRadius, outerRadius]);
    }

    return this.y;
  }

  protected getYDomain(buildModel: BuilderModel): number {
    const keys = buildModel.chartDataSettings.keys;

    return d3.max(buildModel.data, (d) => d3.max(keys, (k: string) => (d as any)[k])) || 0;
  }

  protected getZ(buildModel: BuilderModel): d3.ScaleOrdinal<string, unknown, never> {
    if (!this.z) {
      const keys = buildModel.chartDataSettings.keys;
      const keysColors = buildModel.chartDataSettings.keyColors;

      this.z = d3.scaleOrdinal().domain(keys).range(keysColors);
    }

    return this.z;
  }

  protected getInnerRadius(_: BuilderModel): number {
    return this.innerRadius;
  }

  protected isWeekEndDay(day?: number): boolean {
    return day === this.sundayDay || day === this.saturdayDay;
  }

  public abstract build(buildModel: BuilderModel): void;

  cleanup(): void {
    this.outerRadius = undefined;
    this.average = undefined;
    this.maximum = undefined;
    this.minimum = undefined;
    this.x0 = undefined;
    this.y = undefined;
    this.z = undefined;
  }
}
