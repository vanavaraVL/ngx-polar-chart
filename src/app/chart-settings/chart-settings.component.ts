import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-chart-settings',
  templateUrl: './chart-settings.component.html',
  styleUrls: ['./chart-settings.component.scss'],
})
export class ChartSettingsComponent {
  @Input()
  public hideWeekEnds?: boolean;
}
