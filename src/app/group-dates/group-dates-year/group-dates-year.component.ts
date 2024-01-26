import {Component, OnDestroy, OnInit} from '@angular/core';
import {NgxChartData} from 'NgxPolarChart';
import {NgxPolarChartSettings} from 'NgxPolarChart';
import {Subscription} from 'rxjs';
import {DataSetService} from '../../../services/data-set.service';

@Component({
  selector: 'app-group-dates-year',
  templateUrl: './group-dates-year.component.html',
  styleUrls: ['./group-dates-year.component.scss'],
})
export class GroupDatesYearComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription[] = [];

  public groupDateSample: NgxChartData = null!;

  public customSettings: NgxPolarChartSettings = null!;

  public title: string = 'Polar chart group by year';

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
