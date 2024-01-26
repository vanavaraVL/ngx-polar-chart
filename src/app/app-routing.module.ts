import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SamplesComponent} from './samples/samples.component';
import {GroupDatesDayComponent} from './group-dates/group-dates-day/group-dates-day.component';
import {GroupDatesMonthComponent} from './group-dates/group-dates-month/group-dates-month.component';
import {GroupDatesYearComponent} from './group-dates/group-dates-year/group-dates-year.component';
import {SamplesGroupDatesComponent} from './samples/group-dates/samples-group-dates.component';
import {SamplesGroupSeriesComponent} from './samples/group-series/samples-group-series.component';

const routes: Routes = [
  {
    path: '',
    component: SamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'group-dates',
        pathMatch: 'full',
      },
      {path: 'group-dates', component: SamplesGroupDatesComponent},
      {path: 'group-series', component: SamplesGroupSeriesComponent},
      {path: 'group-dates-day', component: GroupDatesDayComponent},
      {path: 'group-dates-month', component: GroupDatesMonthComponent},
      {path: 'group-dates-year', component: GroupDatesYearComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
