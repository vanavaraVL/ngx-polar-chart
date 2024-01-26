import {Component, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs';
import {NgxChartData} from 'NgxPolarChart';
import {NgxPolarChartSettings} from 'NgxPolarChart';
import {groupCountSample} from '../models/group-count.sample.model';
import {DataSetService} from '../../services/data-set.service';

@Component({
  selector: 'app-group-series',
  templateUrl: './group-series.component.html',
  styleUrls: ['./group-series.component.scss'],
})
export class GroupSeriesComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public groupDateSample: NgxChartData = null!;

  public customSettings: NgxPolarChartSettings = null!;

  public title: string = 'Polar chart series';
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
    return JSON.stringify(this.groupDateSample, null, '\t');
  }

  public setGroup(groupCount: groupCountSample): void {
    this.groupCount = groupCount;
    this.loadSamples();
  }

  private loadSamples(): void {
    this.groupDateSample =
      this.groupCount === groupCountSample.one
        ? this.dataSetService.series1GroupDataSet
        : this.dataSetService.series2GroupsDataSet;
    this.customSettings = this.dataSetService.customSettings;
  }
}
