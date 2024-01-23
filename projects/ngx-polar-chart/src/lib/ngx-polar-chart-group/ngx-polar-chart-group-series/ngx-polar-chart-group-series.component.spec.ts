import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxPolarChartGroupSeriesComponent} from './ngx-polar-chart-group-series.component';
import {PolarChartGroupService} from '../polar-chart-group.service';
import {NgxSeriesGroup} from '../../models/ngx-group-chart.model';
import {SeriesSingleGroupMock, SeriesTwoGroupsMock} from '../../../tests/mocks/group-series.mock';
import {cloneDeep} from 'lodash';

describe('ngx-polar-chart-group-series', () => {
  let component: NgxPolarChartGroupSeriesComponent;
  let fixture: ComponentFixture<NgxPolarChartGroupSeriesComponent>;
  let service: PolarChartGroupService;
  let seriesSingleGroupMock: NgxSeriesGroup;
  let seriesTwoGroupsMock: NgxSeriesGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [PolarChartGroupService],
      declarations: [NgxPolarChartGroupSeriesComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxPolarChartGroupSeriesComponent);
    component = fixture.componentInstance;
    service = fixture.componentRef.injector.get(PolarChartGroupService);

    seriesSingleGroupMock = cloneDeep(SeriesSingleGroupMock);
    seriesTwoGroupsMock = cloneDeep(SeriesTwoGroupsMock);
  });

  it('should create single group', () => {
    service.loadSeriesData(seriesSingleGroupMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create two groups', () => {
    service.loadSeriesData(seriesTwoGroupsMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
