import {ComponentFixture, TestBed} from '@angular/core/testing';

import {cloneDeep} from 'lodash';
import {NgxSeriesGroup} from '../../../../models/ngx-group-chart.model';
import {Builder} from '../builder';
import {ChartBuilder} from '../chart.builder';
import {LegendBuilder} from '../legend.builder';
import {XAxisBuilder} from '../x-axis.builder';
import {YAxisBuilder} from '../y-axis.builder';
import {SeriesSingleGroupMock, SeriesTwoGroupsMock} from '../../../../../tests/mocks/group-series.mock';
import {NgxPolarChartGroupComponent} from '../../../../ngx-polar-chart-group/ngx-polar-chart-group.component';
import {PolarChartService} from '../../../../services/polar-chart.service';

describe('group series builder', () => {
  let component: NgxPolarChartGroupComponent;
  let fixture: ComponentFixture<NgxPolarChartGroupComponent>;
  let service: PolarChartService;
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
      providers: [PolarChartService, Builder, ChartBuilder, LegendBuilder, XAxisBuilder, YAxisBuilder],
      declarations: [NgxPolarChartGroupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxPolarChartGroupComponent);
    component = fixture.componentInstance;
    service = fixture.componentRef.injector.get(PolarChartService);

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
