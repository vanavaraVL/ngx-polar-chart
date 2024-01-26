import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxChartData} from 'NgxPolarChart';
import {NgxPolarChartSettings} from 'NgxPolarChart';
import {Subscription} from 'rxjs';
import {DataSetService} from '../../../services/data-set.service';

@Component({
  selector: 'app-stack-dates-year',
  templateUrl: './stack-date-year.component.html',
  styleUrls: ['./stack-date-year.component.scss'],
})
export class StackDatesYearComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public groupDateSample: NgxChartData = null!;

  public customSettings: NgxPolarChartSettings = null!;

  public title: string = 'Polar chart displayed by year';
  public previousRoute: string = 'stack-dates-sample';

  constructor(private dataSetService: DataSetService) {
    this.loadSamples();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      this.dataSetService.dataSetOnChange.subscribe((result) => {
        if (result) {
          this.loadSamples();
        }
      }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  public getSingleGroupDataSet(): string {
    return JSON.stringify(this.groupDateSample, null, '\t');
  }

  private loadSamples(): void {
    this.groupDateSample = this.dataSetService.date2GroupsDataSetByYear;
    this.customSettings = this.dataSetService.customSettings;
  }
}
