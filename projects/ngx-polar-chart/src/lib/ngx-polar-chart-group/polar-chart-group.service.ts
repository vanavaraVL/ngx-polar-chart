import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';
import {NgxDateGroup, NgxGroupBy, NgxSeriesGroup} from '../models/ngx-group-chart.model';
import moment from 'moment';
import {GroupDataSetModel, GroupDataModel, StorageEntity, StorageEntityAdditionInfo} from '../models/chart.model';
import {NgxPolarChartSettings} from '../models/ngx-group-chart-settings.model';

@Injectable({
  providedIn: 'root',
})
export class PolarChartGroupService {
  private $dateChartData: BehaviorSubject<NgxDateGroup> = new BehaviorSubject<NgxDateGroup>(null!);
  private $seriesChartData: BehaviorSubject<NgxSeriesGroup> = new BehaviorSubject<NgxSeriesGroup>(null!);

  private $chartSettings: BehaviorSubject<NgxPolarChartSettings> = new BehaviorSubject<NgxPolarChartSettings>(null!);

  private readonly defaultLocale: string = 'en-US';
  private readonly maxColor: number = 16777215;

  public dateChartData: Observable<NgxDateGroup> = this.$dateChartData.asObservable();
  public seriesChartData: Observable<NgxSeriesGroup> = this.$seriesChartData.asObservable();
  public chartSettings: Observable<NgxPolarChartSettings> = this.$chartSettings.asObservable();

  constructor() {}

  public loadDateData(chartData: NgxDateGroup): void {
    this.$dateChartData.next(chartData);
  }

  public loadSeriesData(chartData: NgxSeriesGroup): void {
    this.$seriesChartData.next(chartData);
  }

  public loadChartSettings(chartSettings: NgxPolarChartSettings): void {
    this.$chartSettings.next(chartSettings);
  }

  public processDateGroup(data: NgxDateGroup, locale?: string): GroupDataSetModel {
    moment.locale(locale ?? this.defaultLocale);

    const keys: string[] = [];
    const keyColors: string[] = [];

    const storage: Map<string, StorageEntity> = new Map<string, StorageEntity>();

    const monthTrackHash: Record<number, number> = {};
    const yearTrackHash: Record<number, number> = {};

    data.groups.forEach((groupItem, groupItemIndex) => {
      keys.push(groupItem.name);
      keyColors.push(
        `#${Math.floor(Math.random() * this.maxColor)
          .toString(16)
          .padStart(6, '0')
          .toUpperCase()}`,
      );

      groupItem.items.forEach((item) => {
        const currentDate = moment(item.key);

        yearTrackHash[+currentDate.format('YYYY')] = +currentDate.format('YYYY');
        monthTrackHash[+currentDate.format('M')] = +currentDate.format('M');

        switch (data.groupBy) {
          case NgxGroupBy.year:
            this.initializeStorage(
              () => moment(item.key).format('YYYY'),
              storage,
              groupItemIndex,
              data.groups.length,
              item.value,
              () => undefined,
              (currentValues: number[]) => {
                currentValues[groupItemIndex] += item.value;
              },
            );

            break;
          case NgxGroupBy.month:
            this.initializeStorage(
              () => moment(item.key).format('MMMM'),
              storage,
              groupItemIndex,
              data.groups.length,
              item.value,
              () => undefined,
              (currentValues: number[]) => {
                currentValues[groupItemIndex] += item.value;
              },
            );

            break;
          case NgxGroupBy.day:
          default:
            this.initializeStorage(
              () => moment(item.key).format('MMM`D'),
              storage,
              groupItemIndex,
              data.groups.length,
              item.value,
              () => ({dayOfWeek: moment(item.key).weekday(), dayOfWeekName: moment(item.key).format('ddd')}),
              (currentValues: number[]) => {
                currentValues[groupItemIndex] = item.value;
              },
            );

            break;
        }
      });
    });

    this.populateMissedKeysAndValues(storage, data.groups.length, monthTrackHash, yearTrackHash, data.groupBy);

    const flattenData = this.makeFlattenArray(storage, keys);

    return {
      data: flattenData,
      settings: {
        keyColors: keyColors,
        keys: keys,
      },
    };
  }

  public processSeriesGroup(data: NgxSeriesGroup): GroupDataSetModel {
    const keys: string[] = [];
    const keyColors: string[] = [];

    const storage: Map<string, StorageEntity> = new Map<string, StorageEntity>();

    data.groups.forEach((groupItem, groupItemIndex) => {
      keys.push(groupItem.name);
      keyColors.push(
        `#${Math.floor(Math.random() * this.maxColor)
          .toString(16)
          .padStart(6, '0')
          .toUpperCase()}`,
      );

      groupItem.items.forEach((item) => {
        this.initializeStorage(
          () => item.key,
          storage,
          groupItemIndex,
          data.groups.length,
          item.value,
          () => undefined,
          (currentValues: number[]) => {
            currentValues[groupItemIndex] += item.value;
          },
        );
      });
    });

    const flattenData = this.makeFlattenArray(storage, keys);

    return {
      data: flattenData,
      settings: {
        keyColors: keyColors,
        keys: keys,
      },
    };
  }

  private makeFlattenArray(storage: Map<string, StorageEntity>, keys: string[]): GroupDataModel[] {
    const flattenData: GroupDataModel[] = Array.from(storage, (entry) => {
      const entity: StorageEntity = entry[1];
      const key: string = entry[0];

      const resultObject: GroupDataModel = {
        key: key,
        dayOfWeek: entity.additionInfo?.dayOfWeek,
        dayOfWeekName: entity.additionInfo?.dayOfWeekName,
      };

      keys.forEach((k, index) => {
        Object.assign(resultObject, {
          [k]: entity.values[index],
        });
      });

      return resultObject;
    });

    return flattenData;
  }

  private populateMissedKeysAndValues(
    storage: Map<string, StorageEntity>,
    totalGroupsCount: number,
    monthTrackHash: Record<number, number>,
    yearTrackHash: Record<number, number>,
    groupBy?: NgxGroupBy,
  ): void {
    const month = (Object.keys(monthTrackHash) as Array<string>).map((y) => +y)[0];
    const year = (Object.keys(yearTrackHash) as Array<string>).map((y) => +y)[0];

    switch (groupBy) {
      case NgxGroupBy.month:
        const rangeOfMonths = moment.months();

        rangeOfMonths.forEach((m) => {
          this.initializeValuesForKey(m, totalGroupsCount, storage, () => undefined);
        });
        break;
      case NgxGroupBy.year:
        const rangeYear = 2;
        const years = (Object.keys(yearTrackHash) as Array<string>).map((y) => +y);

        const minYear = Math.min(...years);
        const maxYear = Math.max(...years);

        for (let i = minYear - rangeYear; i <= maxYear + rangeYear; i++) {
          const keyFormat = `${i}`;

          this.initializeValuesForKey(keyFormat, totalGroupsCount, storage, () => undefined);
        }

        break;
      case NgxGroupBy.day:
      default:
        const endOfMonth = +moment(new Date(year, month - 1, 1))
          .endOf('month')
          .format('D');

        for (let i = 1; i <= endOfMonth; i++) {
          const currentDate = moment(new Date(year, month - 1, i));

          const keyFormat = currentDate.format('MMM`D');

          this.initializeValuesForKey(keyFormat, totalGroupsCount, storage, () => ({
            dayOfWeek: moment(new Date(year, month, i)).weekday(),
            dayOfWeekName: moment(new Date(year, month, i)).format('dd'),
          }));
        }
        break;
    }
  }

  private initializeStorage(
    getKey: () => string,
    storage: Map<string, StorageEntity>,
    indexGroupItem: number,
    totalGroupsCount: number,
    value: number,
    getAdditionInfo: () => StorageEntityAdditionInfo | undefined,
    updateValuesForKey: (currentValues: number[]) => void,
  ): void {
    const key = getKey();

    if (storage.has(key)) {
      const storageEntity = storage.get(key)!;
      const currentValues = storageEntity.values;

      updateValuesForKey(currentValues);

      storage.set(key, storageEntity);
    }

    this.initializeValuesForKey(key, totalGroupsCount, storage, getAdditionInfo, (items) => {
      items[indexGroupItem] = value;
    });
  }

  private initializeValuesForKey(
    key: string,
    totalGroupsCount: number,
    storage: Map<string, StorageEntity>,
    getAdditionInfo: () => StorageEntityAdditionInfo | undefined,
    setValue?: (items: number[]) => void,
  ): void {
    if (!storage.has(key)) {
      const currentValues: number[] = [...Array(totalGroupsCount)].map((_) => 0);

      if (!!setValue) {
        setValue(currentValues);
      }

      const storageEntity: StorageEntity = {
        values: currentValues,
        additionInfo: getAdditionInfo(),
      };

      storage.set(key, storageEntity);
    }
  }
}
