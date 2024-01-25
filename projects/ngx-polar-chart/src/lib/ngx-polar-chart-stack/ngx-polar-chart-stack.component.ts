import {Component, ViewEncapsulation, ChangeDetectionStrategy} from '@angular/core';
import {PolarChartService} from '../services/polar-chart.service';
import {PolarChartIdentity} from '../factory/polar-chart.factory';
import {NgxPolarChartBaseComponent} from '../common/ngx-polar-chart-base.component';

@Component({
  selector: 'ngx-polar-chart-stack',
  template: `<div [attr.id]="polarChartId" #polarChart></div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PolarChartService],
  styles: [],
})
export class NgxPolarChartStackComponent extends NgxPolarChartBaseComponent {
  public override getChartIdentity(): PolarChartIdentity {
    return PolarChartIdentity.Stack;
  }
}
