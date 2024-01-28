import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NgxChartData} from 'NgxPolarChart';
import {NgxPolarChartSettings} from 'NgxPolarChart';
import {DataSetService} from '../../../services/data-set.service';

@Component({
  selector: 'app-stack-dates-month',
  templateUrl: './stack-date-month.component.html',
  styleUrls: ['./stack-date-month.component.scss'],
})
export class StackDatesMonthComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public stackDateSample: NgxChartData = null!;

  public customSettings: NgxPolarChartSettings = null!;

  public title: string = 'Polar chart displayed by month';
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
    return JSON.stringify(this.stackDateSample, null, '\t');
  }

  private loadSamples(): void {
    this.stackDateSample = this.dataSetService.date2GroupsDataSetByMonth;
    this.customSettings = this.dataSetService.customSettings;
  }
}
