import {Injectable} from '@angular/core';
import moment from 'moment';
import {NgxChart, NgxChartData, NgxGroupBy} from 'NgxPolarChart';
import {NgxPolarChartSettings} from 'NgxPolarChart';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class DataSetService {
  private $dataSetOnChange: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  private readonly dateRange: number = 5;
  private readonly seriesSampleCount: number = 45;

  public date2GroupsDataSet: NgxChartData = null!;
  public date3GroupsDataSet: NgxChartData = null!;
  public date1GroupDataSet: NgxChartData = null!;

  public date2GroupsDataSetByMonth: NgxChartData = null!;
  public date2GroupsDataSetByYear: NgxChartData = null!;

  public series2GroupsDataSet: NgxChartData = null!;
  public series1GroupDataSet: NgxChartData = null!;

  public dataSetOnChange: Observable<boolean> = this.$dataSetOnChange.asObservable();

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

  constructor() {
    this.generateSamples();
  }

  public generateSamples(): void {
    this.loadDateGroupedByDay();
    this.loadSeriesData();
    this.loadDateGroupedByMonthAndYear();

    this.$dataSetOnChange.next(true);
  }

  private loadDateGroupedByDay(endOfMonth?: boolean): void {
    const now = new Date();

    const startDate = +moment(now).startOf('month').format('D');
    const endDate = endOfMonth ? startDate + this.dateRange : +moment(now).endOf('month').format('D');

    const sampleGroupAItems: NgxChart<Date>[] = [];
    const sampleGroupBItems: NgxChart<Date>[] = [];
    const sampleGroupCItems: NgxChart<Date>[] = [];

    for (let i = startDate; i <= endDate; i++) {
      sampleGroupAItems.push({
        key: new Date(moment(now).year(), moment(now).month(), i),
        value: Math.floor(Math.random() * 101),
      });

      sampleGroupBItems.push({
        key: new Date(moment(now).year(), moment(now).month(), i),
        value: Math.floor(Math.random() * 101),
      });

      sampleGroupCItems.push({
        key: new Date(moment(now).year(), moment(now).month(), i),
        value: Math.floor(Math.random() * 101),
      });
    }

    this.date2GroupsDataSet = {
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

    this.date3GroupsDataSet = {
      groups: [
        {
          name: 'Sample group A',
          items: sampleGroupAItems,
        },
        {
          name: 'Sample group B',
          items: sampleGroupBItems,
        },
        {
          name: 'Sample group C',
          items: sampleGroupCItems,
        },
      ],
    };

    this.date1GroupDataSet = {
      groups: [
        {
          name: 'Sample group',
          items: sampleGroupAItems,
        },
      ],
    };
  }

  private loadDateGroupedByMonthAndYear(): void {
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

    this.date2GroupsDataSetByMonth = {
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

    this.date2GroupsDataSetByYear = {
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

    this.series2GroupsDataSet = {
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

    this.series1GroupDataSet = {
      groups: [
        {
          name: 'Sample group',
          items: sampleGroupAItems,
        },
      ],
    };
  }
}
