import {Component, OnInit} from '@angular/core';
import moment from 'moment';
import {NgxChart, NgxDateGroup, NgxGroupBy, NgxSeriesGroup} from 'NgxPolarChart';
import {NgxPolarChartSettings} from 'NgxPolarChart';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  private readonly dateRange: number = 5;
  private readonly seriesSampleCount: number = 45;

  title = 'ngx-polar-chart';

  public dateDataSet: NgxDateGroup = null!;
  public dateSingleDataSet: NgxDateGroup = null!;
  public dateDataSetByMonth: NgxDateGroup = null!;
  public dateDataSetByYear: NgxDateGroup = null!;

  public seriesDataSet: NgxSeriesGroup = null!;
  public seriesSingleDataSet: NgxSeriesGroup = null!;

  public customSettings: NgxPolarChartSettings = {
    barsSettings: {
      average: {
        showColorBar: false,
      },
      maximum: {
        showColorBar: false,
      },
      minimum: {
        showColorBar: false,
      },
      weekend: {
        showColorBar: false,
      },
    },
  };

  public click(): void {
    this.generateSamples();
  }

  ngOnInit(): void {
    this.generateSamples();
  }

  private generateSamples(): void {
    this.loadDateData();
    this.loadSeriesData();
    this.loadDateDataByMonthAndYear();
  }

  private loadDateData(endOfMonth?: boolean): void {
    const now = new Date();

    const startDate = +moment(now).startOf('month').format('D');
    const endDate = endOfMonth ? startDate + this.dateRange : +moment(now).endOf('month').format('D');

    const sampleGroupAItems: NgxChart<Date>[] = [];
    const sampleGroupBItems: NgxChart<Date>[] = [];

    for (let i = startDate; i <= endDate; i++) {
      sampleGroupAItems.push({
        key: new Date(moment(now).year(), moment(now).month(), i),
        value: Math.floor(Math.random() * 101),
      });

      sampleGroupBItems.push({
        key: new Date(moment(now).year(), moment(now).month(), i),
        value: Math.floor(Math.random() * 101),
      });
    }

    this.dateDataSet = {
      groups: [
        {
          name: 'Sample group A',
          items: sampleGroupAItems,
        },
        {
          name: 'Sample group B',
          items: sampleGroupBItems,
        },
      ],
    };

    this.dateSingleDataSet = {
      groups: [
        {
          name: 'Sample group',
          items: sampleGroupAItems,
        },
      ],
    };
  }

  private loadDateDataByMonthAndYear(): void {
    const now = new Date();

    const startMonth = 0;
    const endMonth = 12;

    const sampleGroupAItems: NgxChart<Date>[] = [];
    const sampleGroupBItems: NgxChart<Date>[] = [];

    for (let i = startMonth; i < endMonth; i++) {
      sampleGroupAItems.push({
        key: new Date(moment(now).year(), i, 1),
        value: Math.floor(Math.random() * 101),
      });

      sampleGroupBItems.push({
        key: new Date(moment(now).year(), i, 1),
        value: Math.floor(Math.random() * 101),
      });
    }

    this.dateDataSetByMonth = {
      groupBy: NgxGroupBy.month,
      groups: [
        {
          name: 'Sample group A',
          items: sampleGroupAItems,
        },
        {
          name: 'Sample group B',
          items: sampleGroupBItems,
        },
      ],
    };

    this.dateDataSetByYear = {
      groupBy: NgxGroupBy.year,
      groups: [
        {
          name: 'Sample group A',
          items: sampleGroupAItems,
        },
        {
          name: 'Sample group B',
          items: sampleGroupBItems,
        },
      ],
    };
  }

  private loadSeriesData(): void {
    const sampleGroupAItems: NgxChart<string>[] = [];
    const sampleGroupBItems: NgxChart<string>[] = [];

    for (let i = 1; i <= this.seriesSampleCount; i++) {
      sampleGroupAItems.push({
        key: `P-${i}`,
        value: Math.floor(Math.random() * 101),
      });

      sampleGroupBItems.push({
        key: `P-${i}`,
        value: Math.floor(Math.random() * 101),
      });
    }

    this.seriesDataSet = {
      groups: [
        {
          name: 'Sample series group A',
          items: sampleGroupAItems,
        },
        {
          name: 'Sample series  group B',
          items: sampleGroupBItems,
        },
      ],
    };

    this.seriesSingleDataSet = {
      groups: [
        {
          name: 'Sample group',
          items: sampleGroupAItems,
        },
      ],
    };
  }
}
