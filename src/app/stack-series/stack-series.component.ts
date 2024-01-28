import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxChartData} from 'NgxPolarChart';
import {NgxPolarChartSettings} from 'NgxPolarChart';
import {Subscription} from 'rxjs';
import {groupCountSample} from '../models/group-count.sample.model';
import {DataSetService} from '../../services/data-set.service';

@Component({
  selector: 'app-stack-series',
  templateUrl: './stack-series.component.html',
  styleUrls: ['./stack-series.component.scss'],
})
export class StackSeriesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public stackSeriesSample: NgxChartData = null!;

  public customSettings: NgxPolarChartSettings = null!;

  public title: string = 'Polar chart series';
  public previousRoute: string = 'stack-series-sample';

  public groupCount: groupCountSample = groupCountSample.one;
  public groupCountSample = groupCountSample;

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
    return JSON.stringify(this.stackSeriesSample, null, '\t');
  }

  public setGroup(groupCount: groupCountSample): void {
    this.groupCount = groupCount;
    this.loadSamples();
  }

  private loadSamples(): void {
    switch (this.groupCount) {
      case groupCountSample.one:
        this.stackSeriesSample = this.dataSetService.series1GroupDataSet;
        break;
      case groupCountSample.two:
        this.stackSeriesSample = this.dataSetService.series2GroupsDataSet;
        break;
    }
    this.customSettings = this.dataSetService.customSettings;
  }
}
