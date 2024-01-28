import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataSetService} from '../../../services/data-set.service';
import {NgxChartData} from 'NgxPolarChart';
import {NgxPolarChartSettings} from 'NgxPolarChart';
import {Subscription} from 'rxjs';
import {groupCountSample} from '../../models/group-count.sample.model';

@Component({
  selector: 'app-stack-dates-day',
  templateUrl: './stack-date-day.component.html',
  styleUrls: ['./stack-date-day.component.scss'],
})
export class StackDatesDayComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public stackDateSample: NgxChartData = null!;

  public customSettings: NgxPolarChartSettings = null!;

  public title: string = 'Polar chart displayed by day';
  public previousRoute: string = 'stack-dates-sample';

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
    return JSON.stringify(this.stackDateSample, null, '\t');
  }

  public setGroup(groupCount: groupCountSample): void {
    this.groupCount = groupCount;
    this.loadSamples();
  }

  private loadSamples(): void {
    switch (this.groupCount) {
      case groupCountSample.one:
        this.stackDateSample = this.dataSetService.date1GroupDataSet;
        break;
      case groupCountSample.two:
        this.stackDateSample = this.dataSetService.date2GroupsDataSet;
        break;
      case groupCountSample.three:
        this.stackDateSample = this.dataSetService.date3GroupsDataSet;
        break;
    }

    this.customSettings = this.dataSetService.customSettings;
  }
}
