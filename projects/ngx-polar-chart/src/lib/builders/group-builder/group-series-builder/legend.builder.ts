import {Injectable} from '@angular/core';
import {BuilderModel} from '../../../models/builder.model';
import {ChartBuilderBase, IPolarChartBuilder} from '../../chart-builder.base';

@Injectable({
  providedIn: 'root',
})
export class LegendBuilder extends ChartBuilderBase implements IPolarChartBuilder {
  build(buildModel: BuilderModel): void {
    if (!buildModel.chartSettings.showLegend) {
      return;
    }

    const keys = buildModel.chartDataSettings.keys;

    const z = this.getZ(buildModel);

    const legend = buildModel.svg
      .append('g')
      .selectAll('g')
      .data(keys)
      .enter()
      .append('g')
      .attr('transform', (_, i: number) => {
        return 'translate(-50,' + (i - (keys.length - 1) / 2) * 25 + ')';
      });

    legend
      .append('circle')
      .attr('r', 8)
      .attr('fill', <any>z);

    legend
      .append('text')
      .attr('x', 15)
      .attr('y', 0)
      .attr('dy', '0.35em')
      .text((d: string) => {
        return d;
      });

    legend.selectAll('text').attr('dx', 15);
  }
}
