import {ComponentFixture, TestBed} from '@angular/core/testing';

import {cloneDeep} from 'lodash';
import {NgxPolarChartGroupDateComponent} from '../../../../ngx-polar-chart-group/ngx-polar-chart-group-date/ngx-polar-chart-group-date.component';
import {PolarChartGroupService} from '../../../../ngx-polar-chart-group/polar-chart-group.service';
import {NgxDateGroup} from '../../../../models/ngx-group-chart.model';
import {
  DateSingleGroupGroupedByDayMock,
  DateTwoGroupsGroupedByDayMock,
} from '../../../../../tests/mocks/group-date.mock';
import {Builder} from '../builder';
import {ChartBuilder} from '../chart.builder';
import {LegendBuilder} from '../legend.builder';
import {XAxisBuilder} from '../x-axis.builder';
import {YAxisBuilder} from '../y-axis.builder';

describe('group date builder', () => {
  let component: NgxPolarChartGroupDateComponent;
  let fixture: ComponentFixture<NgxPolarChartGroupDateComponent>;
  let service: PolarChartGroupService;
  let builder: Builder;

  let chartBuilder: ChartBuilder;
  let legendBuilder: LegendBuilder;
  let xAxisBuilder: XAxisBuilder;
  let yAxisBuilder: YAxisBuilder;

  let groupDateByDaySingleGroupMock: NgxDateGroup;
  let groupDateByDayTwoGroupsMock: NgxDateGroup;

  let spyBuilder: any;
  let spyChartBuilder: any;
  let spyLegendBuilder: any;
  let spyXAxisBuilder: any;
  let spyYAxisBuilder: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [PolarChartGroupService, Builder, ChartBuilder, LegendBuilder, XAxisBuilder, YAxisBuilder],
      declarations: [NgxPolarChartGroupDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxPolarChartGroupDateComponent);
    component = fixture.componentInstance;
    service = fixture.componentRef.injector.get(PolarChartGroupService);

    builder = TestBed.inject(Builder);
    chartBuilder = TestBed.inject(ChartBuilder);
    legendBuilder = TestBed.inject(LegendBuilder);
    xAxisBuilder = TestBed.inject(XAxisBuilder);
    yAxisBuilder = TestBed.inject(YAxisBuilder);

    spyBuilder = spyOn(builder, 'buildChart').and.callThrough();
    spyChartBuilder = spyOn(chartBuilder, 'build').and.callThrough();
    spyLegendBuilder = spyOn(legendBuilder, 'build').and.callThrough();
    spyXAxisBuilder = spyOn(xAxisBuilder, 'build').and.callThrough();
    spyYAxisBuilder = spyOn(yAxisBuilder, 'build').and.callThrough();

    groupDateByDaySingleGroupMock = cloneDeep(DateSingleGroupGroupedByDayMock);
    groupDateByDayTwoGroupsMock = cloneDeep(DateTwoGroupsGroupedByDayMock);
  });

  it('should be created', () => {
    expect(builder).toBeTruthy();
  });

  it('should call all builders for single group', () => {
    service.loadDateData(groupDateByDaySingleGroupMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(spyBuilder).toHaveBeenCalled();
    expect(spyLegendBuilder).toHaveBeenCalled();
    expect(spyXAxisBuilder).toHaveBeenCalled();
    expect(spyYAxisBuilder).toHaveBeenCalled();
    expect(spyChartBuilder).toHaveBeenCalled();
  });

  it('should call all builders for two group', () => {
    service.loadDateData(groupDateByDayTwoGroupsMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(spyBuilder).toHaveBeenCalled();
    expect(spyLegendBuilder).toHaveBeenCalled();
    expect(spyXAxisBuilder).toHaveBeenCalled();
    expect(spyYAxisBuilder).toHaveBeenCalled();
    expect(spyChartBuilder).toHaveBeenCalled();
  });
});
