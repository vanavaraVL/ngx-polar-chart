import {Injectable} from '@angular/core';
import * as d3 from 'd3';
import {BuilderModel} from '../../../models/builder.model';
import {BuilderBase, IBuilder} from '../../builder.base';

@Injectable({
  providedIn: 'root',
})
export class YAxisBuilder extends BuilderBase implements IBuilder {
  build(buildModel: BuilderModel): void {
    const max = this.getMaximum(buildModel);
    const average = this.getAverage(buildModel);

    const y = this.getY(buildModel);

    const tickFormat = 5;
    const yTicksValues = d3.ticks(0, max + 1, tickFormat);

    const yAxis = buildModel.svg.append('g').attr('text-anchor', 'middle');

    const yMeanTick = yAxis.append('g').datum([average]);

    yMeanTick
      .append('circle')
      .attr('fill', 'none')
      .attr('stroke', '#C0625E')
      .attr('stroke-dasharray', '5 3')
      .attr('r', <any>y);

    const yTick = yAxis.selectAll('g').data(yTicksValues).enter().append('g');

    if (buildModel.chartSettings.tickSettings!.showTicks) {
      yTick.append('circle').attr('fill', 'none').attr('stroke', '#ccdcea').attr('r', y);
    }

    if (buildModel.chartSettings.tickSettings!.showTicksLabels) {
      yTick
        .append('text')
        .attr('y', (d: number) => {
          return -y(d);
        })
        .attr('dy', '0.35em')
        .attr('fill', 'none')
        .attr('stroke', '#fff')
        .attr('stroke-width', 5)
        .style('font-size', `${buildModel.chartSettings.fontSettings!.fontSize}px`)
        .text(y.tickFormat(tickFormat, 's'));

      yTick
        .append('text')
        .attr('y', (d: number) => {
          return -y(d);
        })
        .attr('dy', '0.35em')
        .style('font-size', `${buildModel.chartSettings.fontSettings!.fontSize}px`)
        .text(y.tickFormat(5, 's'));
    }
  }
}
