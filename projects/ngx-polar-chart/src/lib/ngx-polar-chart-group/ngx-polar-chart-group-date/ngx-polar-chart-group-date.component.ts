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
import {NgxDateGroup} from '../../models/ngx-group-chart.model';
import {Subscription, combineLatest} from 'rxjs';
import {tap} from 'rxjs/operators';
import {PolarChartGroupService} from '../polar-chart-group.service';
import {GroupDataModel, GroupDataSettingsModel} from '../../models/chart.model';
import {NgxPolarChartSettings} from '../../models/ngx-group-chart-settings.model';
import {Builder} from '../../builders/group-builder/group-date-builder/builder';

@Component({
  selector: 'ngx-polar-chart-group-date',
  template: `<div [attr.id]="groupDateChartId" #groupDateChart></div>`,
  encapsulation: ViewEncapsulation.None,
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [PolarChartGroupService],
  styles: [],
})
export class NgxPolarChartGroupDateComponent implements AfterViewInit, OnInit, OnDestroy {
  private data: GroupDataModel[] = [];
  private dataSettings: GroupDataSettingsModel = null!;
  private settings: NgxPolarChartSettings = null!;

  private subscriptions: Subscription[] = [];

  public groupDateChartId: string = '';

  @ViewChild('groupDateChart')
  public chartContainer?: ElementRef;

  @Input()
  set chartData(chartData: NgxDateGroup) {
    this.groupedChartService.loadDateData(chartData);
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
    this.groupDateChartId = `groupDateChart${crypto.randomUUID()}`;
  }

  ngAfterViewInit(): void {
    this.createChart();
  }

  ngOnInit(): void {
    this.subscriptions.push(
      combineLatest([this.groupedChartService.dateChartData, this.groupedChartService.chartSettings])
        .pipe(tap(() => this.changeDetector.markForCheck()))
        .subscribe(([chartData, chartSettings]) => {
          if (!!chartData) {
            const groupedData = this.groupedChartService.processDateGroup(chartData, chartSettings?.locale);

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
    this.builder.buildChart(this.chartContainer, this.groupDateChartId, this.data, this.settings, this.dataSettings);
  }
}
