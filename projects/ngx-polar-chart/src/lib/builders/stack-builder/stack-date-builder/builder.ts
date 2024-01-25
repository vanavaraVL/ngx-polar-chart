import {ChartBuilder} from './chart.builder';
import {Injectable, ElementRef} from '@angular/core';

import * as d3 from 'd3';
import * as lodash from 'lodash';

import {GroupDataSettingsModel} from '../../../models/chart.model';
import {NgxPolarChartSettings} from '../../../models/ngx-group-chart-settings.model';
import {GroupDataModel} from '../../../models/chart.model';
import {BuilderModel} from '../../../models/builder.model';
import {XAxisBuilder} from './x-axis.builder';
import {YAxisBuilder} from './y-axis.builder';
import {LegendBuilder} from './legend.builder';
import {IPolarChartBuilder, IBuilder} from '../../chart-builder.base';

@Injectable({
  providedIn: 'root',
})
export class Builder implements IBuilder {
  private builders: IPolarChartBuilder[] = [];

  private defaultPlotSettings: NgxPolarChartSettings = {
    width: 960,
    height: 800,
    fontSettings: {
      fontFamily: 'sans-serif',
      fontSize: 16,
    },
    showToolTip: true,
    labelSettings: {
      showWeekDays: false,
      showWeekEndDays: true,
    },
    tickSettings: {
      showTicks: true,
      showTicksLabels: true,
    },
    showLegend: true,
  };

  constructor(
    private chartBuilder: ChartBuilder,
    private xAxisBuilder: XAxisBuilder,
    private yAxisBuilder: YAxisBuilder,
    private legendBuilder: LegendBuilder,
  ) {
    this.builders.push(chartBuilder);
    this.builders.push(xAxisBuilder);
    this.builders.push(yAxisBuilder);
    this.builders.push(legendBuilder);
  }

  public buildChart(
    chartContainer: ElementRef | undefined,
    chartId: string,
    data: GroupDataModel[],
    plotSettings: NgxPolarChartSettings,
    chartDataSettings: GroupDataSettingsModel,
  ): void {
    if (!chartContainer) return;

    d3.select(`#${chartId} svg`).remove();

    const element = chartContainer!.nativeElement;
    const plotSettingsCopy = this.copyPlotSettings(plotSettings) || {};

    this.overridePlotSettings(plotSettingsCopy);
    this.overrideGroupColorSettings(plotSettingsCopy, chartDataSettings);

    const width = plotSettingsCopy.width!;
    const height = plotSettingsCopy.height!;

    const fontSize = plotSettingsCopy.fontSettings!.fontSize!;
    const fontFamily = plotSettingsCopy.fontSettings!.fontFamily!;

    const svg = d3
      .select(element)
      .append('svg')
      .attr('viewBox', `${-width / 2} ${-height / 2} ${width} ${height}`)
      .style('width', '100%')
      .style('height', '100%')
      .style('font', `${fontSize}px ${fontFamily}`);

    const buildObject: BuilderModel = {
      svg: svg,
      chartDataSettings: chartDataSettings,
      data: data,
      chartSettings: plotSettingsCopy,
    };

    this.builders.forEach((b) => b.build(buildObject));
    this.builders.forEach((b) => b.cleanup());
  }

  private overrideGroupColorSettings(
    plotSettings: NgxPolarChartSettings,
    chartDataSettings: GroupDataSettingsModel,
  ): void {
    if (chartDataSettings.keyColors.length === plotSettings.barsSettings?.groupColors?.length) {
      chartDataSettings.keyColors = plotSettings.barsSettings?.groupColors;
    }
  }

  private overridePlotSettings(plotSettings: NgxPolarChartSettings): void {
    plotSettings.width ??= this.defaultPlotSettings.width;
    plotSettings.height ??= this.defaultPlotSettings.height;

    if (!plotSettings.fontSettings) {
      plotSettings.fontSettings = {};
    }

    plotSettings.fontSettings.fontFamily ??= this.defaultPlotSettings.fontSettings!.fontFamily;
    plotSettings.fontSettings.fontSize ??= this.defaultPlotSettings.fontSettings!.fontSize;

    plotSettings.showToolTip ??= this.defaultPlotSettings.showToolTip;

    if (!plotSettings.labelSettings) {
      plotSettings.labelSettings = {};
    }

    plotSettings.labelSettings.showWeekDays ??= this.defaultPlotSettings.labelSettings!.showWeekDays;
    plotSettings.labelSettings.showWeekEndDays ??= this.defaultPlotSettings.labelSettings!.showWeekEndDays;

    if (!plotSettings.tickSettings) {
      plotSettings.tickSettings = {};
    }

    plotSettings.tickSettings.showTicks ??= this.defaultPlotSettings.tickSettings!.showTicks;
    plotSettings.tickSettings.showTicksLabels ??= this.defaultPlotSettings.tickSettings!.showTicksLabels;

    plotSettings.showLegend ??= this.defaultPlotSettings.showLegend!;
  }

  private copyPlotSettings(plotSettings: NgxPolarChartSettings): NgxPolarChartSettings {
    return lodash.cloneDeep(plotSettings);
  }
}
