import {ChartBuilder} from './chart.builder';
import {Injectable, ElementRef} from '@angular/core';

import * as d3 from 'd3';
import * as lodash from 'lodash';

import {ChartDataSettingsModel} from '../../../models/chart.model';
import {NgxPolarChartSettings} from '../../../models/ngx-group-chart-settings.model';
import {ChartDataModel} from '../../../models/chart.model';
import {BuilderModel} from '../../../models/builder.model';
import {XAxisBuilder} from './x-axis.builder';
import {YAxisBuilder} from './y-axis.builder';
import {LegendBuilder} from './legend.builder';
import {IPolarChartBuilder, IBuilder} from '../../chart-builder.base';
import {isDataEmpty} from '../../../common/polar-chart-common.utils';

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
    barsSettings: {
      average: {
        color: '#30983dd6',
        showColorBar: true,
      },
      maximum: {
        showColorBar: true,
        color: '#983036',
      },
      minimum: {
        showColorBar: true,
        color: '#69b3a2',
      },
    },
    tickSettings: {
      showTicks: true,
      showTicksLabels: true,
    },
    showLegend: true,
  };

  constructor(
    chartBuilder: ChartBuilder,
    xAxisBuilder: XAxisBuilder,
    yAxisBuilder: YAxisBuilder,
    legendBuilder: LegendBuilder,
  ) {
    this.builders.push(chartBuilder);
    this.builders.push(xAxisBuilder);
    this.builders.push(yAxisBuilder);
    this.builders.push(legendBuilder);
  }

  public buildChart(
    chartContainer: ElementRef | undefined,
    chartId: string,
    data: ChartDataModel[],
    plotSettings: NgxPolarChartSettings,
    chartDataSettings: ChartDataSettingsModel,
  ): void {
    if (!chartContainer) return;

    d3.select(`#${chartId} svg`).remove();

    if (isDataEmpty(data)) {
      return;
    }

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
    chartDataSettings: ChartDataSettingsModel,
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

    if (!plotSettings.barsSettings) {
      plotSettings.barsSettings = {};
    }

    if (!plotSettings.barsSettings.average) {
      plotSettings.barsSettings.average = {};
    }

    plotSettings.barsSettings.average.color ??= this.defaultPlotSettings.barsSettings!.average!.color;
    plotSettings.barsSettings.average.showColorBar ??= this.defaultPlotSettings.barsSettings!.average!.showColorBar;

    if (!plotSettings.barsSettings.maximum) {
      plotSettings.barsSettings.maximum = {};
    }

    plotSettings.barsSettings.maximum.color ??= this.defaultPlotSettings.barsSettings!.maximum!.color;
    plotSettings.barsSettings.maximum.showColorBar ??= this.defaultPlotSettings.barsSettings!.maximum!.showColorBar;

    if (!plotSettings.barsSettings.minimum) {
      plotSettings.barsSettings.minimum = {};
    }

    plotSettings.barsSettings.minimum.color ??= this.defaultPlotSettings.barsSettings!.minimum!.color;
    plotSettings.barsSettings.minimum.showColorBar ??= this.defaultPlotSettings.barsSettings!.minimum!.showColorBar;

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
