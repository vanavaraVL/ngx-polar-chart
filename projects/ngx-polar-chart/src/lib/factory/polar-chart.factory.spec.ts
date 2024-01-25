import {TestBed} from '@angular/core/testing';
import {Builder as GroupDateBuilder} from '../builders/group-builder/group-date-builder/builder';
import {Builder as GroupSeriesBuilder} from '../builders/group-builder/group-series-builder/builder';
import {Builder as StackDateBuilder} from '../builders/stack-builder/stack-date-builder/builder';
import {Builder as StackSeriesBuilder} from '../builders/stack-builder/stack-series-builder/builder';
import {PolarChartFactory, PolarChartIdentity} from './polar-chart.factory';
import {NgxDateGroup, NgxSeriesGroup} from '../models/ngx-group-chart.model';
import {DateSingleGroupGroupedByDayMock} from '../../tests/mocks/group-date.mock';
import {cloneDeep} from 'lodash';
import {SeriesSingleGroupMock} from '../../tests/mocks/group-series.mock';

describe('polar chart factory', () => {
  let groupDateBuilder: GroupDateBuilder;
  let groupSeriesBuilder: GroupSeriesBuilder;
  let stackDateBuilder: StackDateBuilder;
  let stackSeriesBuilder: StackSeriesBuilder;

  let factory: PolarChartFactory;

  let groupDateByDaySingleGroupMock: NgxDateGroup;
  let groupSeriesSingleGroupMock: NgxSeriesGroup;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PolarChartFactory, GroupDateBuilder, GroupSeriesBuilder, StackDateBuilder, StackSeriesBuilder],
    });

    groupDateBuilder = TestBed.inject(GroupDateBuilder);
    groupSeriesBuilder = TestBed.inject(GroupSeriesBuilder);
    stackDateBuilder = TestBed.inject(StackDateBuilder);
    stackSeriesBuilder = TestBed.inject(StackSeriesBuilder);

    factory = TestBed.inject(PolarChartFactory);

    groupDateByDaySingleGroupMock = cloneDeep(DateSingleGroupGroupedByDayMock);
    groupSeriesSingleGroupMock = cloneDeep(SeriesSingleGroupMock);
  });

  it('group date builder should be created', () => {
    expect(groupDateBuilder).toBeTruthy();
  });

  it('group series builder should be created', () => {
    expect(groupSeriesBuilder).toBeTruthy();
  });

  it('stack date builder should be created', () => {
    expect(stackDateBuilder).toBeTruthy();
  });

  it('stack series builder should be created', () => {
    expect(stackSeriesBuilder).toBeTruthy();
  });

  it('should return group date builder', () => {
    const builder = factory.getBuilder(groupDateByDaySingleGroupMock, PolarChartIdentity.Group);

    expect(builder).toBeInstanceOf(GroupDateBuilder);
  });

  it('should return group series builder', () => {
    const builder = factory.getBuilder(groupSeriesSingleGroupMock, PolarChartIdentity.Group);

    expect(builder).toBeInstanceOf(GroupSeriesBuilder);
  });

  it('should return stack date builder', () => {
    const builder = factory.getBuilder(groupDateByDaySingleGroupMock, PolarChartIdentity.Stack);

    expect(builder).toBeInstanceOf(StackDateBuilder);
  });

  it('should return stack series builder', () => {
    const builder = factory.getBuilder(groupSeriesSingleGroupMock, PolarChartIdentity.Stack);

    expect(builder).toBeInstanceOf(StackSeriesBuilder);
  });
});
