import { TestBed } from '@angular/core/testing';

import { NgxPolarChartService } from './ngx-polar-chart.service';

describe('NgxPolarChartService', () => {
  let service: NgxPolarChartService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NgxPolarChartService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
