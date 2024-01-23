import {ComponentFixture, TestBed} from '@angular/core/testing';

import {cloneDeep} from 'lodash';
import {PolarChartGroupService} from '../../../../ngx-polar-chart-group/polar-chart-group.service';
import {NgxSeriesGroup} from '../../../../models/ngx-group-chart.model';
import {Builder} from '../builder';
import {ChartBuilder} from '../chart.builder';
import {LegendBuilder} from '../legend.builder';
import {XAxisBuilder} from '../x-axis.builder';
import {YAxisBuilder} from '../y-axis.builder';
import {SeriesSingleGroupMock, SeriesTwoGroupsMock} from '../../../../../tests/mocks/group-series.mock';
import {NgxPolarChartGroupSeriesComponent} from '../../../../ngx-polar-chart-group/ngx-polar-chart-group-series/ngx-polar-chart-group-series.component';

describe('group series builder', () => {
  let component: NgxPolarChartGroupSeriesComponent;
  let fixture: ComponentFixture<NgxPolarChartGroupSeriesComponent>;
  let service: PolarChartGroupService;
  let builder: Builder;

  let chartBuilder: ChartBuilder;
  let legendBuilder: LegendBuilder;
  let xAxisBuilder: XAxisBuilder;
  let yAxisBuilder: YAxisBuilder;

  let seriesSingleGroupMock: NgxSeriesGroup;
  let seriesTwoGroupsMock: NgxSeriesGroup;

  let spyBuilder: any;
  let spyChartBuilder: any;
  let spyLegendBuilder: any;
  let spyXAxisBuilder: any;
  let spyYAxisBuilder: any;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [PolarChartGroupService, Builder, ChartBuilder, LegendBuilder, XAxisBuilder, YAxisBuilder],
      declarations: [NgxPolarChartGroupSeriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxPolarChartGroupSeriesComponent);
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

    seriesSingleGroupMock = cloneDeep(SeriesSingleGroupMock);
    seriesTwoGroupsMock = cloneDeep(SeriesTwoGroupsMock);
  });

  it('should be created', () => {
    expect(builder).toBeTruthy();
  });

  it('should call all builders for single group', () => {
    service.loadSeriesData(seriesSingleGroupMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(spyBuilder).toHaveBeenCalled();
    expect(spyLegendBuilder).toHaveBeenCalled();
    expect(spyXAxisBuilder).toHaveBeenCalled();
    expect(spyYAxisBuilder).toHaveBeenCalled();
    expect(spyChartBuilder).toHaveBeenCalled();
  });

  it('should call all builders for two group', () => {
    service.loadSeriesData(seriesTwoGroupsMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(spyBuilder).toHaveBeenCalled();
    expect(spyLegendBuilder).toHaveBeenCalled();
    expect(spyXAxisBuilder).toHaveBeenCalled();
    expect(spyYAxisBuilder).toHaveBeenCalled();
    expect(spyChartBuilder).toHaveBeenCalled();
  });
});
