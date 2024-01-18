import {TestBed} from '@angular/core/testing';

import {PolarChartGroupService} from './polar-chart-group.service';

describe('NgxPolarChartService', () => {
  let service: PolarChartGroupService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(PolarChartGroupService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
