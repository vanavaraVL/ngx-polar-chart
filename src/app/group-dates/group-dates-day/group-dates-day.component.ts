import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataSetService} from '../../../services/data-set.service';
import {NgxChartData} from 'NgxPolarChart';
import {NgxPolarChartSettings} from 'NgxPolarChart';
import {Subscription} from 'rxjs';
import {groupCountSample} from '../../models/group-count.sample.model';

@Component({
  selector: 'app-group-dates-day',
  templateUrl: './group-dates-day.component.html',
  styleUrls: ['./group-dates-day.component.scss'],
})
export class GroupDatesDayComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public groupDateSample: NgxChartData = null!;

  public customSettings: NgxPolarChartSettings = null!;

  public title: string = 'Polar chart group by day';
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
        ? this.dataSetService.date1GroupDataSet
        : this.dataSetService.date2GroupsDataSet;
    this.customSettings = this.dataSetService.customSettings;
  }
}
