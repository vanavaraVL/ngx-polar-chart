import {TestBed} from '@angular/core/testing';
import {PolarChartService} from '../lib/services/polar-chart.service';

export const ConfigureTestBed = () => {
  TestBed.configureTestingModule({
    providers: [PolarChartService],
  });
};
