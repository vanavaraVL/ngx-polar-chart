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
import {Subscription, combineLatest} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PolarChartGroupService} from '../polar-chart-group.service';
import {GroupDataModel, GroupDataSettingsModel} from '../../models/chart.model';
import {NgxPolarChartSettings} from '../../models/ngx-group-chart-settings.model';
import {Builder} from '../../builders/group-builder/group-series-builder/builder';
import {NgxSeriesGroup} from '../../models/ngx-group-chart.model';

@Component({
  selector: 'ngx-polar-chart-group-series',
  template: `<div [attr.id]="groupSeriesChartId" #groupSeriesChart></div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PolarChartGroupService],
  styles: [],
})
export class NgxPolarChartGroupSeriesComponent implements AfterViewInit, OnInit, OnDestroy {
  private data: GroupDataModel[] = [];
  private dataSettings: GroupDataSettingsModel = null!;
  private settings: NgxPolarChartSettings = null!;

  private subscriptions: Subscription[] = [];

  public groupSeriesChartId: string = '';

  @ViewChild('groupSeriesChart')
  public chartContainer?: ElementRef;

  @Input()
  set chartData(chartData: NgxSeriesGroup) {
    this.groupedChartService.loadSeriesData(chartData);
  }

  @Input()
  set chartSettings(chartSettings: NgxPolarChartSettings) {
    this.groupedChartService.loadChartSettings(chartSettings);
  }

  constructor(
    private changeDetector: ChangeDetectorRef,
    private groupedChartService: PolarChartGroupService,
    private builder: Builder,
  ) {
    this.groupSeriesChartId = `groupSeriesChart${crypto.randomUUID()}`;
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.groupedChartService.seriesChartData, this.groupedChartService.chartSettings])
        .pipe(tap(() => this.changeDetector.markForCheck()))
        .subscribe(([chartData, chartSettings]) => {
          if (!!chartData) {
            const groupedData = this.groupedChartService.processSeriesGroup(chartData);

            this.data = groupedData.data;
            this.dataSettings = groupedData.settings;
            this.settings = chartSettings;

            this.createChart();
          }
        }),
    );
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }

  private createChart(): void {
    this.builder.buildChart(this.chartContainer, this.groupSeriesChartId, this.data, this.settings, this.dataSettings);
  }
}
