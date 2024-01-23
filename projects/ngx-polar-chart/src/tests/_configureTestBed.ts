import {TestBed} from '@angular/core/testing';
import {PolarChartGroupService} from '../lib/ngx-polar-chart-group/polar-chart-group.service';

export const ConfigureTestBed = () => {
  TestBed.configureTestingModule({
    providers: [PolarChartGroupService],
  });
};
