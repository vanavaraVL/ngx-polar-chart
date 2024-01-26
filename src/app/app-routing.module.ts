import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {SamplesComponent} from './samples/samples.component';
import {GroupDatesDayComponent} from './group-dates/group-dates-day/group-dates-day.component';
import {GroupDatesMonthComponent} from './group-dates/group-dates-month/group-dates-month.component';
import {GroupDatesYearComponent} from './group-dates/group-dates-year/group-dates-year.component';
import {SamplesGroupDatesComponent} from './samples/group-dates/samples-group-dates.component';
import {SamplesGroupSeriesComponent} from './samples/group-series/samples-group-series.component';
import {GroupSeriesComponent} from './group-series/group-series.component';
import {SamplesStackDatesComponent} from './samples/stack-dates/samples-stack-dates.component';
import {StackDatesDayComponent} from './stack-dates/stack-date-day/stack-date-day.component';
import {StackDatesMonthComponent} from './stack-dates/stack-date-month/stack-date-month.component';
import {StackDatesYearComponent} from './stack-dates/stack-date-year/stack-date-year.component';
import {StackSeriesComponent} from './stack-series/stack-series.component';
import {SamplesStackSeriesComponent} from './samples/stack-series/samples-stack-series.component';
import {InstallationComponent} from './installation/installation.component';
import {SettingsComponent} from './settings/settings.component';

const routes: Routes = [
  {
    path: '',
    component: SamplesComponent,
    children: [
      {
        path: '',
        redirectTo: 'group-dates-sample',
        pathMatch: 'full',
      },
      {path: 'group-dates-sample', component: SamplesGroupDatesComponent},
      {path: 'group-series-sample', component: SamplesGroupSeriesComponent},
      {path: 'group-dates-day', component: GroupDatesDayComponent},
      {path: 'group-dates-month', component: GroupDatesMonthComponent},
      {path: 'group-dates-year', component: GroupDatesYearComponent},
      {path: 'group-series', component: GroupSeriesComponent},
      {path: 'stack-dates-sample', component: SamplesStackDatesComponent},
      {path: 'stack-series-sample', component: SamplesStackSeriesComponent},
      {path: 'stack-dates-day', component: StackDatesDayComponent},
      {path: 'stack-dates-month', component: StackDatesMonthComponent},
      {path: 'stack-dates-year', component: StackDatesYearComponent},
      {path: 'stack-series', component: StackSeriesComponent},
      {path: 'installation', component: InstallationComponent},
      {path: 'settings', component: SettingsComponent},
    ],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
