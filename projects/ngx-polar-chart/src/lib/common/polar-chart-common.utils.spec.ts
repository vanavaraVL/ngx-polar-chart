import {TestBed} from '@angular/core/testing';
import {NgxDateGroup, NgxSeriesGroup} from '../models/ngx-group-chart.model';
import {DateSingleGroupGroupedByDayMock} from '../../tests/mocks/group-date.mock';
import {cloneDeep} from 'lodash';
import {SeriesSingleGroupMock} from '../../tests/mocks/group-series.mock';
import {isDataEmpty, isNgxDate, isNgxString} from './polar-chart-common.utils';
import {PolarChartService} from '../services/polar-chart.service';
import {GroupDataSetModel} from '../../../../../dist/ngx-polar-chart/lib/models/chart.model';

describe('common utils', () => {
  let groupDateByDaySingleGroupMock: NgxDateGroup;
  let groupSeriesSingleGroupMock: NgxSeriesGroup;

  let service: PolarChartService;

  let resultGroupDate: GroupDataSetModel;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolarChartService],
    });

    service = TestBed.inject(PolarChartService);

    groupDateByDaySingleGroupMock = cloneDeep(DateSingleGroupGroupedByDayMock);
    groupSeriesSingleGroupMock = cloneDeep(SeriesSingleGroupMock);

    resultGroupDate = service.processDateGroup(groupDateByDaySingleGroupMock);
  });

  it('isNgxDate should return true for NgxDateGroup', () => {
    const result = isNgxDate(groupDateByDaySingleGroupMock);

    expect(result).toBeTruthy();
  });

  it('isNgxDate should return false for NgxSeriesGroup', () => {
    const result = isNgxDate(groupSeriesSingleGroupMock);

    expect(result).not.toBeTruthy();
  });

  it('isNgxString should return true for NgxSeriesGroup', () => {
    const result = isNgxString(groupSeriesSingleGroupMock);

    expect(result).toBeTruthy();
  });

  it('isNgxString should return false for NgxDateGroup', () => {
    const result = isNgxString(groupDateByDaySingleGroupMock);

    expect(result).not.toBeTruthy();
  });

  it('isDataEmpty should return true for empty data set', () => {
    const result = isDataEmpty([]);

    expect(result).toBeTruthy();
  });

  it('isDataEmpty should return false for non-empty data set', () => {
    const result = isDataEmpty(resultGroupDate.data);

    expect(result).not.toBeTruthy();
  });
});
