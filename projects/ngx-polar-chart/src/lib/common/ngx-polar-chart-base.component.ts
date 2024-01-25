import {
  Component,
  AfterViewInit,
  OnInit,
  ElementRef,
  Input,
  ViewChild,
  ViewEncapsulation,
  ChangeDetectorRef,
  ChangeDetectionStrategy,
  OnDestroy,
} from '@angular/core';
import {NgxChartData} from '../models/ngx-group-chart.model';
import {Subscription, combineLatest} from 'rxjs';
import {tap} from 'rxjs/operators';
import {ChartDataModel, ChartDataSettingsModel} from '../models/chart.model';
import {NgxPolarChartSettings} from '../models/ngx-group-chart-settings.model';
import {PolarChartService} from '../services/polar-chart.service';
import {PolarChartFactory, PolarChartIdentity} from '../factory/polar-chart.factory';

@Component({
  selector: 'ngx-polar-chart-base',
  template: `<div></div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PolarChartService],
  styles: [],
})
export abstract class NgxPolarChartBaseComponent implements AfterViewInit, OnInit, OnDestroy {
  protected data: ChartDataModel[] = [];
  protected dataSet: NgxChartData = null!;
  protected dataSettings: ChartDataSettingsModel = null!;
  protected settings: NgxPolarChartSettings = null!;

  private subscriptions: Subscription[] = [];

  protected polarChartId: string = '';

  @ViewChild('polarChart')
  public chartContainer?: ElementRef;

  @Input()
  set chartData(chartData: NgxChartData) {
    this.polarChartService.loadChartData(chartData);
  }

  @Input()
  set chartSettings(chartSettings: NgxPolarChartSettings) {
    this.polarChartService.loadChartSettings(chartSettings);
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private polarChartService: PolarChartService,
    private polarChartFactory: PolarChartFactory,
  ) {
    this.polarChartId = `polarChart-${crypto.randomUUID()}`;
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.polarChartService.dateChartData, this.polarChartService.chartSettings])
        .pipe(tap(() => this.changeDetector.markForCheck()))
        .subscribe(([chartData, chartSettings]) => {
          if (!!chartData) {
            const groupedData = this.polarChartService.processDateGroup(chartData, chartSettings?.locale);

            this.data = groupedData.data;
            this.dataSettings = groupedData.settings;
            this.dataSet = chartData;
            this.settings = chartSettings;

            this.createChart();
          }
        }),
      combineLatest([this.polarChartService.seriesChartData, this.polarChartService.chartSettings])
        .pipe(tap(() => this.changeDetector.markForCheck()))
        .subscribe(([chartData, chartSettings]) => {
          if (!!chartData) {
            const groupedData = this.polarChartService.processSeriesGroup(chartData);

            this.data = groupedData.data;
            this.dataSettings = groupedData.settings;
            this.dataSet = chartData;
            this.settings = chartSettings;

            this.createChart();
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  public abstract getChartIdentity(): PolarChartIdentity;

  private createChart(): void {
    const builder = this.polarChartFactory.getBuilder(this.dataSet, this.getChartIdentity());

    if (!!builder) {
      builder.buildChart(this.chartContainer, this.polarChartId, this.data, this.settings, this.dataSettings);
    }
  }
}
