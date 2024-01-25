import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxPolarChartStackComponent} from './ngx-polar-chart-stack.component';
import {NgxDateGroup, NgxSeriesGroup} from '../models/ngx-group-chart.model';
import {DateSingleGroupGroupedByDayMock, DateTwoGroupsGroupedByDayMock} from '../../tests/mocks/group-date.mock';
import {cloneDeep} from 'lodash';
import {PolarChartService} from '../services/polar-chart.service';
import {SeriesSingleGroupMock, SeriesTwoGroupsMock} from '../../tests/mocks/group-series.mock';

describe('ngx-polar-chart-stack', () => {
  let component: NgxPolarChartStackComponent;
  let fixture: ComponentFixture<NgxPolarChartStackComponent>;
  let service: PolarChartService;

  let groupDateByDaySingleGroupMock: NgxDateGroup;
  let groupDateByDayTwoGroupsMock: NgxDateGroup;

  let seriesSingleGroupMock: NgxSeriesGroup;
  let seriesTwoGroupsMock: NgxSeriesGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [PolarChartService],
      declarations: [NgxPolarChartStackComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxPolarChartStackComponent);
    component = fixture.componentInstance;
    service = fixture.componentRef.injector.get(PolarChartService);

    groupDateByDaySingleGroupMock = cloneDeep(DateSingleGroupGroupedByDayMock);
    groupDateByDayTwoGroupsMock = cloneDeep(DateTwoGroupsGroupedByDayMock);

    seriesSingleGroupMock = cloneDeep(SeriesSingleGroupMock);
    seriesTwoGroupsMock = cloneDeep(SeriesTwoGroupsMock);
  });

  it('should create stack for single date group', () => {
    service.loadDateData(groupDateByDaySingleGroupMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create stack two date groups', () => {
    service.loadDateData(groupDateByDayTwoGroupsMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create stack for single series group', () => {
    service.loadSeriesData(seriesSingleGroupMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create stack for two series groups', () => {
    service.loadSeriesData(seriesTwoGroupsMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
