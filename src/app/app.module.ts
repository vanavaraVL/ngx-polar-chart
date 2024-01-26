import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppComponent} from './app.component';
import {NgxPolarChartModule} from 'NgxPolarChart';
import {AppRoutingModule} from './app-routing.module';
import {StackSeriesComponent} from './stack-series/stack-series.component';
import {StackDatesComponent} from './stack-dates/stack-dates.component';
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

@NgModule({
  declarations: [
    AppComponent,
    StackDatesComponent,
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
  ],
  imports: [AppRoutingModule, BrowserModule, NgxPolarChartModule],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
