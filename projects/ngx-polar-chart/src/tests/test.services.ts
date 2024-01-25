import {Injectable} from '@angular/core';
import {PolarChartService} from '../lib/services/polar-chart.service';

@Injectable({
  providedIn: 'root',
})
export class TestServices {
  constructor(public polarChartService: PolarChartService) {}
}
