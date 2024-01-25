import {Injectable} from '@angular/core';
import * as d3 from 'd3';
import {BuilderModel} from '../../../models/builder.model';
import {ChartBuilderBase, IPolarChartBuilder} from '../../chart-builder.base';

@Injectable({
  providedIn: 'root',
})
export class ChartBuilder extends ChartBuilderBase implements IPolarChartBuilder {
  build(buildModel: BuilderModel): void {
    const innerRadius = this.getInnerRadius(buildModel);

    const arc = d3
      .arc()
      .innerRadius(function (d: any) {
        return y(d[0]);
      })
      .outerRadius(function (d: any) {
        return y(d[1]);
      })
      .startAngle(function (d: any) {
        return x0(d.data.key) || 0;
      })
      .endAngle(function (d: any) {
        return (x0(d.data.key) || 0) + x0.bandwidth();
      })
      .padAngle(0.01)
      .padRadius(innerRadius);

    const x0 = this.getX0(buildModel);
    const y = this.getY(buildModel);
    const z = this.getZ(buildModel);

    buildModel.svg
      .append('g')
      .selectAll('g')
      .data((d3.stack().keys(buildModel.chartDataSettings.keys) as any)(buildModel.data))
      .enter()
      .append('g')
      .attr('fill', (d: any) => {
        return z(d.key) as string;
      })
      .selectAll('path')
      .data((d: any) => {
        return d.map((v: any) => ((v.key = d.key), v));
      })
      .enter()
      .append('path')
      .attr('d', <any>arc)
      .append('title')
      .text((d: any) => (buildModel.chartSettings.showToolTip ? `${d.key}: ${d.data[d.key]}` : ''));
  }

  protected override getYDomain(buildModel: BuilderModel): number {
    const keys = buildModel.chartDataSettings.keys;

    return (
      d3.max(buildModel.data, (d: any) => {
        let sumOfCurrentKey = 0;
        keys.forEach((k) => (sumOfCurrentKey += d[k]));
        return sumOfCurrentKey;
      }) || 0
    );
  }
}
