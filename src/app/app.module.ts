import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgxPolarChartModule} from 'NgxPolarChart';
import {AppRoutingModule} from './app-routing.module';
import {StackSeriesComponent} from './stack-series/stack-series.component';
import {GroupSeriesComponent} from './group-series/group-series.component';
import {GroupDatesDayComponent} from './group-dates/group-dates-day/group-dates-day.component';
import {ChartSettingsComponent} from './chart-settings/chart-settings.component';
import {DataSetGeneratorComponent} from './data-generator/data-generator.component';
import {BreadcrumbComponent} from './breadcrumbs/breadcrumbs.component';
import {GroupDatesMonthComponent} from './group-dates/group-dates-month/group-dates-month.component';
import {GroupDatesYearComponent} from './group-dates/group-dates-year/group-dates-year.component';
import {SamplesComponent} from './samples/samples.component';
import {SamplesGroupDatesComponent} from './samples/group-dates/samples-group-dates.component';
import {SamplesGroupSeriesComponent} from './samples/group-series/samples-group-series.component';
import {StackDatesYearComponent} from './stack-dates/stack-date-year/stack-date-year.component';
import {StackDatesMonthComponent} from './stack-dates/stack-date-month/stack-date-month.component';
import {StackDatesDayComponent} from './stack-dates/stack-date-day/stack-date-day.component';
import {SamplesStackDatesComponent} from './samples/stack-dates/samples-stack-dates.component';
import {SamplesStackSeriesComponent} from './samples/stack-series/samples-stack-series.component';
import {InstallationComponent} from './installation/installation.component';
import {SettingsComponent} from './settings/settings.component';

@NgModule({
  declarations: [
    AppComponent,
    SamplesComponent,
    StackSeriesComponent,
    DataSetGeneratorComponent,
    GroupDatesDayComponent,
    GroupSeriesComponent,
    ChartSettingsComponent,
    BreadcrumbComponent,
    SamplesGroupDatesComponent,
    SamplesGroupSeriesComponent,
    GroupDatesYearComponent,
    GroupDatesMonthComponent,
    StackDatesDayComponent,
    StackDatesMonthComponent,
    StackDatesYearComponent,
    SamplesStackDatesComponent,
    SamplesStackSeriesComponent,
    InstallationComponent,
    SettingsComponent,
  ],
  imports: [AppRoutingModule, BrowserModule, NgxPolarChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
