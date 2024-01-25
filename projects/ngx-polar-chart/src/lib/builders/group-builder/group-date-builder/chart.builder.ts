import {Injectable} from '@angular/core';
import * as d3 from 'd3';
import {BuilderGroupedDateItemModel, BuilderModel} from '../../../models/builder.model';
import {ChartBuilderBase, IPolarChartBuilder} from '../../chart-builder.base';

@Injectable({
  providedIn: 'root',
})
export class ChartBuilder extends ChartBuilderBase implements IPolarChartBuilder {
  build(buildModel: BuilderModel): void {
    const innerRadius = this.getInnerRadius(buildModel);

    const keys = buildModel.chartDataSettings.keys;

    const arc = d3
      .arc()
      .innerRadius(innerRadius)
      .outerRadius((d: any) => y(d.value))
      .startAngle((d: any) => (x0(d.group) || 0) + (x1(d.key) || 0))
      .endAngle((d: any) => (x0(d.group) || 0) + (x1(d.key) || 0) + x1.bandwidth())
      .padAngle(0.01)
      .padRadius(innerRadius);

    const x0 = this.getX0(buildModel);
    const x1 = d3.scaleBand().domain(keys).range([0, x0.bandwidth()]).align(0);

    const y = this.getY(buildModel);

    const z = this.getZ(buildModel);

    const max = this.getMaximum(buildModel);
    const min = this.getMinimum(buildModel);
    const average = this.getAverage(buildModel);

    buildModel.svg
      .append('g')
      .selectAll('g')
      .data(buildModel.data)
      .join('g')
      .selectAll('path')
      .data((d) =>
        keys.map<BuilderGroupedDateItemModel>((key) => ({
          key,
          group: d.key,
          value: (d as any)[key],
          dayOfWeek: d.dayOfWeek,
        })),
      )
      .join('path')
      .attr('fill', (d: BuilderGroupedDateItemModel) => {
        if (d.value === max && buildModel.chartSettings.barsSettings!.maximum!.showColorBar!) {
          return buildModel.chartSettings.barsSettings!.maximum!.color!;
        } else if (d.value === min && buildModel.chartSettings.barsSettings!.minimum!.showColorBar!) {
          return buildModel.chartSettings.barsSettings!.minimum!.color!;
        } else if (
          d.value <= average &&
          !this.isWeekEndDay(d.dayOfWeek) &&
          buildModel.chartSettings.barsSettings!.average!.showColorBar!
        ) {
          return buildModel.chartSettings.barsSettings!.average!.color!;
        } else if (this.isWeekEndDay(d.dayOfWeek) && buildModel.chartSettings.barsSettings!.weekend!.showColorBar!) {
          return buildModel.chartSettings.barsSettings!.weekend!.color!;
        }

        return z(d.key) as string;
      })
      .attr('d', arc as any)
      .append('title')
      .text((d: BuilderGroupedDateItemModel) => (buildModel.chartSettings.showToolTip ? `${d.key}: ${d.value}` : ''));
  }
}
