import {Injectable} from '@angular/core';
import {GroupDataModel} from '../../../models/chart.model';
import {BuilderModel} from '../../../models/builder.model';
import {BuilderBase, IBuilder} from '../../builder.base';

@Injectable({
  providedIn: 'root',
})
export class XAxisBuilder extends BuilderBase implements IBuilder {
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

    const lineHeigh = -4;

    insideLabels
      .append('line')
      .attr('x2', (_: GroupDataModel) => {
        return lineHeigh;
      })
      .attr('stroke', '#000');

    insideLabels
      .append('text')
      .attr('transform', (d: GroupDataModel) =>
        ((x0(d[groupKey]) || 0) + x0.bandwidth() / 2 + Math.PI / 2) % (2 * Math.PI) < Math.PI
          ? 'rotate(90)translate(0,16)'
          : 'rotate(-90)translate(0,-9)',
      )
      .style('font-size', `${buildModel.chartSettings.fontSettings!.fontSize}px`);
  }
}
