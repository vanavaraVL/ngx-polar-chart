import {Injectable} from '@angular/core';
import {PolarChartGroupService} from '../lib/ngx-polar-chart-group/polar-chart-group.service';

@Injectable({
  providedIn: 'root',
})
export class TestServices {
  constructor(public groupService: PolarChartGroupService) {}
}
