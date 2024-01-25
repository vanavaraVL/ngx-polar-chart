import {NgModule} from '@angular/core';

import {NgxPolarChartGroupModule} from './ngx-polar-chart-group/ngx-polar-chart-group.module';
import {NgxPolarChartStackModule} from './ngx-polar-chart-stack/ngx-polar-chart-stack.module';

@NgModule({
  exports: [NgxPolarChartGroupModule, NgxPolarChartStackModule],
})
export class NgxPolarChartModule {}
