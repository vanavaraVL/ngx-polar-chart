import {Injectable} from '@angular/core';
import {GroupDataModel} from '../../../models/chart.model';
import {BuilderModel} from '../../../models/builder.model';
import {ChartBuilderBase, IPolarChartBuilder} from '../../chart-builder.base';

@Injectable({
  providedIn: 'root',
})
export class XAxisBuilder extends ChartBuilderBase implements IPolarChartBuilder {
  build(buildModel: BuilderModel): void {
    const innerRadius = this.getInnerRadius(buildModel);
    const outerRadius = this.getOuterRadius(buildModel);

    const groupKey = 'key';

    const x0 = this.getX0(buildModel);

    var outsideLabels = buildModel.svg
      .append('g')
      .selectAll()
      .data(buildModel.data)
      .enter()
      .append('g')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        (d: GroupDataModel) => `
        rotate(${(((x0(d[groupKey]) || 0) + x0.bandwidth() / 2) * 180) / Math.PI - 90})
        translate(${outerRadius + 35},0)
      `,
      );

    outsideLabels
      .append('text')
      .attr('transform', (d: GroupDataModel) =>
        ((x0(d[groupKey]) || 0) + x0.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
          ? 'rotate(90)translate(0,16)'
          : 'rotate(-90)translate(0,-9)',
      )
      .style('font-size', `${buildModel.chartSettings.fontSettings!.fontSize}px`)
      .text((d) => d[groupKey]);

    var insideLabels = buildModel.svg
      .append('g')
      .selectAll('g')
      .data(buildModel.data)
      .enter()
      .append('g')
      .attr('text-anchor', 'middle')
      .attr(
        'transform',
        (d: GroupDataModel) => `
        rotate(${(((x0(d[groupKey]) || 0) + x0.bandwidth() / 2) * 180) / Math.PI - 90})
        translate(${innerRadius},0)
      `,
      );

    const lineWeekEndHeigh = -7;
    const lineWeekDayHeigh = -4;

    insideLabels
      .append('line')
      .attr('x2', (d: GroupDataModel) => {
        if (
          buildModel.chartSettings.labelSettings!.showWeekDays ||
          buildModel.chartSettings.labelSettings!.showWeekEndDays
        ) {
          return this.isWeekEndDay(d.dayOfWeek) ? lineWeekEndHeigh : lineWeekDayHeigh;
        }

        return 0;
      })
      .attr('stroke', '#000');

    insideLabels
      .append('text')
      .attr('transform', (d: GroupDataModel) =>
        ((x0(d[groupKey]) || 0) + x0.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
          ? 'rotate(90)translate(0,16)'
          : 'rotate(-90)translate(0,-9)',
      )
      .style('font-size', `${buildModel.chartSettings.fontSettings!.fontSize}px`)
      .text((d: GroupDataModel) => {
        if (buildModel.chartSettings.labelSettings!.showWeekDays && !this.isWeekEndDay(d.dayOfWeek)) {
          return d.dayOfWeekName || '';
        } else if (buildModel.chartSettings.labelSettings!.showWeekEndDays && this.isWeekEndDay(d.dayOfWeek)) {
          return d.dayOfWeekName || '';
        }

        return '';
      });
  }
}
