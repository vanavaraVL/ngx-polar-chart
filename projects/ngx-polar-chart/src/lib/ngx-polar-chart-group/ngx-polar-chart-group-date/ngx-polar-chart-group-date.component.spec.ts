import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NgxPolarChartGroupDateComponent} from './ngx-polar-chart-group-date.component';
import {PolarChartGroupService} from '../polar-chart-group.service';
import {NgxDateGroup} from '../../models/ngx-group-chart.model';
import {DateSingleGroupGroupedByDayMock, DateTwoGroupsGroupedByDayMock} from '../../../tests/mocks/group-date.mock';
import {cloneDeep} from 'lodash';

describe('ngx-polar-chart-group-date', () => {
  let component: NgxPolarChartGroupDateComponent;
  let fixture: ComponentFixture<NgxPolarChartGroupDateComponent>;
  let service: PolarChartGroupService;
  let groupDateByDaySingleGroupMock: NgxDateGroup;
  let groupDateByDayTwoGroupsMock: NgxDateGroup;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      providers: [PolarChartGroupService],
      declarations: [NgxPolarChartGroupDateComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(NgxPolarChartGroupDateComponent);
    component = fixture.componentInstance;
    service = fixture.componentRef.injector.get(PolarChartGroupService);

    groupDateByDaySingleGroupMock = cloneDeep(DateSingleGroupGroupedByDayMock);
    groupDateByDayTwoGroupsMock = cloneDeep(DateTwoGroupsGroupedByDayMock);
  });

  it('should create single group', () => {
    service.loadDateData(groupDateByDaySingleGroupMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });

  it('should create two groups', () => {
    service.loadDateData(groupDateByDayTwoGroupsMock);
    service.loadChartSettings({});

    fixture.detectChanges();

    expect(component).toBeTruthy();
  });
});
