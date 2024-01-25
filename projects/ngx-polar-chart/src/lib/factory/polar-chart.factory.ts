import {Injectable} from '@angular/core';

import {IBuilder} from '../builders/chart-builder.base';
import {Builder as GroupDateBuilder} from '../builders/group-builder/group-date-builder/builder';
import {Builder as GroupSeriesBuilder} from '../builders/group-builder/group-series-builder/builder';
import {Builder as StackDateBuilder} from '../builders/stack-builder/stack-date-builder/builder';
import {Builder as StackSeriesBuilder} from '../builders/stack-builder/stack-series-builder/builder';
import {NgxChartData} from '../models/ngx-group-chart.model';
import {isNgxDate, isNgxString} from '../common/polar-chart-common.utils';

export enum PolarChartIdentity {
  Group,
  Stack,
}

@Injectable({
  providedIn: 'root',
})
export class PolarChartFactory {
  constructor(
    private groupDateBuilder: GroupDateBuilder,
    private groupSeriesBuilder: GroupSeriesBuilder,
    private stackDateBuilder: StackDateBuilder,
    private stackSeriesBuilder: StackSeriesBuilder,
  ) {}

  public getBuilder(chartData: NgxChartData, chartIdentity: PolarChartIdentity): IBuilder | null {
    switch (chartIdentity) {
      case PolarChartIdentity.Group:
        if (isNgxDate(chartData)) {
          return this.groupDateBuilder;
        }

        if (isNgxString(chartData)) {
          return this.groupSeriesBuilder;
        }
        return null;
      case PolarChartIdentity.Stack:
        if (isNgxDate(chartData)) {
          return this.stackDateBuilder;
        }

        if (isNgxString(chartData)) {
          return this.stackSeriesBuilder;
        }
        return null;
      default:
        return null;
    }
  }
}
