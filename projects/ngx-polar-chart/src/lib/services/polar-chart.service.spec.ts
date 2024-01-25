import {TestBed} from '@angular/core/testing';

import {PolarChartService} from './polar-chart.service';
import {ConfigureTestBed} from '../../tests/_configureTestBed';
import {TestServices} from '../../tests/test.services';
import {NgxDateGroup, NgxSeriesGroup} from '../models/ngx-group-chart.model';
import {cloneDeep} from 'lodash';
import {
  DateSingleGroupGroupedByDayMock,
  DateSingleGroupGroupedByMonthMock,
  DateSingleGroupGroupedByYearMock,
  DateTwoGroupsGroupedByDayMock,
  DateTwoGroupsGroupedByMonthMock,
  DateTwoGroupsGroupedByYearMock,
  now,
} from '../../tests/mocks/group-date.mock';
import moment from 'moment';
import {ChartDataSetModel} from '../models/chart.model';
import {SeriesSingleGroupMock, SeriesTwoGroupsMock} from '../../tests/mocks/group-series.mock';

describe('polar chart services', () => {
  let services: TestServices;
  let polarChartService: PolarChartService;

  let dateByDaySingleGroupMock: NgxDateGroup;
  let dateByMonthSingleGroupMock: NgxDateGroup;
  let dateByYearSingleGroupMock: NgxDateGroup;

  let dateByDayTwoGroupsMock: NgxDateGroup;
  let dateByMonthTwoGroupsMock: NgxDateGroup;
  let dateByYearTwoGroupsMock: NgxDateGroup;

  let dateNow: Date;

  /*
    Flatten data (has run in January):
    {
       {key: 'Jan`1', 'First group test': 1}
       {key: 'Jan`2', 'First group test': 2}
       {key: 'Jan`3', 'First group test': 3}
    }
  */
  let resultDateByDayForSingleGroup: ChartDataSetModel;

  /*
    Flatten data (has run in January):
    {
       {key: 'January', 'First group test': 6}       <- sum of all passed values in January
       {key: 'February', 'First group test': 0}
       {key: 'March', 'First group test': 0}
       {key: 'April', 'First group test': 0}
       {key: 'May', 'First group test': 0}
       {key: 'June', 'First group test': 0}
       {key: 'July', 'First group test': 0}
       {key: 'August', 'First group test': 0}
       {key: 'September', 'First group test': 0}
       {key: 'November', 'First group test': 0}
       {key: 'December', 'First group test': 0}
    }
  */
  let resultDateByMonthForSingleGroup: ChartDataSetModel;

  /*
    Flatten data (has run in 2024):
    {
       {key: '2022', 'First group test': 0}
       {key: '2023', 'First group test': 0}
       {key: '2024', 'First group test': 6} <- sum of all passed values in 2024
       {key: '2025', 'First group test': 0}
       {key: '2026', 'First group test': 0}
    }
  */
  let resultDateByYearForSingleGroup: ChartDataSetModel;

  /*
    Flatten data (has run in January):
    {
       {key: 'Jan`1', 'First group test': 1, 'Second group test': 1}
       {key: 'Jan`2', 'First group test': 2, 'Second group test': 2}
       {key: 'Jan`3', 'First group test': 3, 'Second group test': 3}
    }
  */
  let resultDateByDayForTwoGroups: ChartDataSetModel;

  /*
    Flatten data (has run in January):
    {
       {key: 'January', 'First group test': 6, 'Second group test': 6} <- in each group the sum of values in the certain group
       {key: 'February', 'First group test': 0, 'Second group test': 0}
       {key: 'March', 'First group test': 0, 'Second group test': 0}
       {key: 'April', 'First group test': 0, 'Second group test': 0}
       {key: 'May', 'First group test': 0, 'Second group test': 0}
       {key: 'June', 'First group test': 0, 'Second group test': 0}
       {key: 'July', 'First group test': 0, 'Second group test': 0}
       {key: 'August', 'First group test': 0, 'Second group test': 0}
       {key: 'September', 'First group test': 0, 'Second group test': 0}
       {key: 'November', 'First group test': 0, 'Second group test': 0}
       {key: 'December', 'First group test': 0, 'Second group test': 0}
    }
  */
  let resultDateByMonthForTwoGroups: ChartDataSetModel;

  /*
    Flatten data (has run in 2024):
    {
       {key: '2022', 'First group test': 0, 'Second group test': 0}
       {key: '2023', 'First group test': 0, 'Second group test': 0}
       {key: '2024', 'First group test': 6, 'Second group test': 6} <- in each group the sum of values in the certain group
       {key: '2025', 'First group test': 0, 'Second group test': 0}
       {key: '2026', 'First group test': 0, 'Second group test': 0}
    }
  */
  let resultDateByYearForTwoGroups: ChartDataSetModel;

  let seriesSingleGroupMock: NgxSeriesGroup;
  let seriesTwoGroupsMock: NgxSeriesGroup;

  /*
    Flatten data:
    {
       {key: 'Test-A', 'First group test': 1}
       {key: 'Test-B', 'First group test': 2}
       {key: 'Test-C', 'First group test': 3}
    }
  */
  let resultSeriesSingleGroup: ChartDataSetModel;

  /*
    Flatten data:
    {
       {key: 'A', 'First group test': 1, 'Second group test': 1}
       {key: 'B', 'First group test': 2, 'Second group test': 2}
       {key: 'C', 'First group test': 3, 'Second group test': 3}
    }
  */
  let resultSeriesTwoGroups: ChartDataSetModel;

  beforeEach(() => {
    ConfigureTestBed();
    services = TestBed.inject(TestServices);

    polarChartService = services.polarChartService;

    dateByDaySingleGroupMock = cloneDeep(DateSingleGroupGroupedByDayMock);
    dateByMonthSingleGroupMock = cloneDeep(DateSingleGroupGroupedByMonthMock);
    dateByYearSingleGroupMock = cloneDeep(DateSingleGroupGroupedByYearMock);

    dateByDayTwoGroupsMock = cloneDeep(DateTwoGroupsGroupedByDayMock);
    dateByMonthTwoGroupsMock = cloneDeep(DateTwoGroupsGroupedByMonthMock);
    dateByYearTwoGroupsMock = cloneDeep(DateTwoGroupsGroupedByYearMock);

    seriesSingleGroupMock = cloneDeep(SeriesSingleGroupMock);
    seriesTwoGroupsMock = cloneDeep(SeriesTwoGroupsMock);

    resultDateByDayForSingleGroup = polarChartService.processDateGroup(dateByDaySingleGroupMock);
    resultDateByMonthForSingleGroup = polarChartService.processDateGroup(dateByMonthSingleGroupMock);
    resultDateByYearForSingleGroup = polarChartService.processDateGroup(dateByYearSingleGroupMock);

    resultDateByDayForTwoGroups = polarChartService.processDateGroup(dateByDayTwoGroupsMock);
    resultDateByMonthForTwoGroups = polarChartService.processDateGroup(dateByMonthTwoGroupsMock);
    resultDateByYearForTwoGroups = polarChartService.processDateGroup(dateByYearTwoGroupsMock);

    resultSeriesSingleGroup = polarChartService.processSeriesGroup(seriesSingleGroupMock);
    resultSeriesTwoGroups = polarChartService.processSeriesGroup(seriesTwoGroupsMock);

    dateNow = now;
  });

  it('service should be created', () => {
    expect(services).toBeTruthy();
  });

  it('group service should be created', () => {
    expect(polarChartService).toBeTruthy();
  });

  it('processDateGroup() should return flatten dataset for single group/two groups', () => {
    expect(resultDateByDayForSingleGroup).not.toBeNull();
    expect(resultDateByDayForTwoGroups).not.toBeNull();
  });

  it('processDateGroup() should return filled in by all days in current month flatten dataset for single group/two groups', () => {
    const daysInMonth = +moment(dateNow).endOf('month').format('D');

    expect(resultDateByDayForSingleGroup.data.length).toEqual(daysInMonth);
    expect(resultDateByDayForTwoGroups.data.length).toEqual(daysInMonth);
  });

  it('processDateGroup() should return filled in flatten dataset with passed values in the single group/in each group of two groups', () => {
    const singleGroup = dateByDaySingleGroupMock.groups[0].items;
    const singleGroupName = dateByDaySingleGroupMock.groups[0].name;

    resultDateByDayForSingleGroup.data.forEach((d: any, index) => {
      if (index < singleGroup.length) {
        expect(d[singleGroupName]).toEqual(dateByDaySingleGroupMock.groups[0].items[index].value);
      }
    });

    const firstGroup = dateByDayTwoGroupsMock.groups[0].items;
    const secondGroup = dateByDayTwoGroupsMock.groups[1].items;
    const firstGroupName = dateByDayTwoGroupsMock.groups[0].name;
    const secondGroupName = dateByDayTwoGroupsMock.groups[1].name;

    resultDateByDayForTwoGroups.data.forEach((d: any, index) => {
      if (index < firstGroup.length) {
        expect(d[firstGroupName]).toEqual(dateByDayTwoGroupsMock.groups[0].items[index].value);
      }

      if (index < secondGroup.length) {
        expect(d[secondGroupName]).toEqual(dateByDayTwoGroupsMock.groups[1].items[index].value);
      }
    });
  });

  it('processDateGroup() should return filled in by all days in current month flatten dataset with initialized values by 0 for single group/in each of two groups', () => {
    const singleGroup = dateByDaySingleGroupMock.groups[0].items;
    const singleGroupName = dateByDaySingleGroupMock.groups[0].name;

    resultDateByDayForSingleGroup.data.forEach((d: any, index) => {
      if (singleGroup.length < index) {
        expect(d[singleGroupName]).toEqual(0);
      }
    });

    const firstGroup = dateByDayTwoGroupsMock.groups[0].items;
    const secondGroup = dateByDayTwoGroupsMock.groups[1].items;
    const firstGroupName = dateByDayTwoGroupsMock.groups[0].name;
    const secondGroupName = dateByDayTwoGroupsMock.groups[1].name;

    resultDateByDayForTwoGroups.data.forEach((d: any, index) => {
      if (firstGroup.length < index) {
        expect(d[firstGroupName]).toEqual(0);
      }

      if (secondGroup.length < index) {
        expect(d[secondGroupName]).toEqual(0);
      }
    });
  });

  it('processDateGroup() should return filled in by all days in current month flatten dataset with non empty keys for single group/two groups', () => {
    resultDateByDayForSingleGroup.data.forEach((d) => {
      expect(d.key).not.toBeNull();
    });

    resultDateByDayForTwoGroups.data.forEach((d) => {
      expect(d.key).not.toBeNull();
    });
  });

  it('processDateGroup() should return filled in by all days in current month flatten dataset with formatted keys for single group/two groups', () => {
    resultDateByDayForSingleGroup.data.forEach((d, index) => {
      const currentKey = moment(new Date(now.getFullYear(), now.getMonth(), ++index)).format('MMM`D');

      expect(d.key).toEqual(currentKey);
    });

    resultDateByDayForTwoGroups.data.forEach((d, index) => {
      const currentKey = moment(new Date(now.getFullYear(), now.getMonth(), ++index)).format('MMM`D');

      expect(d.key).toEqual(currentKey);
    });
  });

  it('processDateGroup() should return filled in by all months in current year flatten dataset for single group/two groups', () => {
    const monthsInYear = 12;

    expect(resultDateByMonthForSingleGroup.data.length).toEqual(monthsInYear);
    expect(resultDateByMonthForTwoGroups.data.length).toEqual(monthsInYear);
  });

  it('processDateGroup() should return filled in by all months in current year flatten dataset with formatted keys [months names] for single group/two groups', () => {
    const months = moment.months();

    resultDateByMonthForSingleGroup.data.forEach((d, index) => {
      expect(d.key).toEqual(months[index]);
    });

    resultDateByMonthForTwoGroups.data.forEach((d, index) => {
      expect(d.key).toEqual(months[index]);
    });
  });

  it('processDateGroup() should return filled in by all months in current year flatten dataset with sum of passed values for single group/two groups', () => {
    const singleGroupName = dateByMonthSingleGroupMock.groups[0].name;
    const sumOfPassedValues = dateByMonthSingleGroupMock.groups[0].items.map((i) => i.value).reduce((a, b) => a + b, 0);

    const currentMonth = +moment(now).format('M');
    const passedMonth = <any>resultDateByMonthForSingleGroup.data[currentMonth - 1];

    expect(passedMonth[singleGroupName]).toEqual(sumOfPassedValues);

    const firstGroupName = dateByMonthTwoGroupsMock.groups[0].name;
    const firstGroupSumOfPassedValues = dateByMonthTwoGroupsMock.groups[0].items
      .map((i) => i.value)
      .reduce((a, b) => a + b, 0);

    const secondGroupName = dateByMonthTwoGroupsMock.groups[1].name;
    const secondGroupSumOfPassedValues = dateByMonthTwoGroupsMock.groups[1].items
      .map((i) => i.value)
      .reduce((a, b) => a + b, 0);

    const passedMonthTwoGroups = <any>resultDateByMonthForTwoGroups.data[currentMonth - 1];

    expect(passedMonthTwoGroups[firstGroupName]).toEqual(firstGroupSumOfPassedValues);
    expect(passedMonthTwoGroups[secondGroupName]).toEqual(secondGroupSumOfPassedValues);
  });

  it('processDateGroup() should return filled in by all months in current year flatten dataset with initialized values by 0 for single group/two groups', () => {
    const singleGroupName = dateByDaySingleGroupMock.groups[0].name;

    resultDateByMonthForSingleGroup.data.forEach((d: any, index) => {
      if (0 < index) {
        expect(d[singleGroupName]).toEqual(0);
      }
    });

    const firstGroupName = dateByMonthTwoGroupsMock.groups[0].name;
    const secondGroupName = dateByMonthTwoGroupsMock.groups[1].name;

    resultDateByMonthForTwoGroups.data.forEach((d: any, index) => {
      if (0 < index) {
        expect(d[firstGroupName]).toEqual(0);
        expect(d[secondGroupName]).toEqual(0);
      }
    });
  });

  it('processDateGroup() should return filled in by years flatten dataset for single group/two groups', () => {
    const onePassedAndAddedFourYears = 5;

    expect(resultDateByYearForSingleGroup.data.length).toEqual(onePassedAndAddedFourYears);
    expect(resultDateByYearForTwoGroups.data.length).toEqual(onePassedAndAddedFourYears);
  });

  it('processDateGroup() should return filled in by years flatten dataset with formatted keys [years names] for single group/two groups', () => {
    const currentYear = now.getFullYear();

    const years: number[] = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1, currentYear + 2];

    resultDateByYearForSingleGroup.data.forEach((d, index) => {
      expect(+d.key).toEqual(years[index]);
    });

    resultDateByYearForTwoGroups.data.forEach((d, index) => {
      expect(+d.key).toEqual(years[index]);
    });
  });

  it('processDateGroup() should return filled in by years flatten dataset with sum of passed values for single group/two groups', () => {
    const singleGroupName = dateByYearSingleGroupMock.groups[0].name;
    const sumOfPassedValues = dateByYearSingleGroupMock.groups[0].items.map((i) => i.value).reduce((a, b) => a + b, 0);
    const groupIndexInDataSet = 2; // as we added automatically 2 years before

    const passedMonth = <any>resultDateByYearForSingleGroup.data[groupIndexInDataSet];

    expect(passedMonth[singleGroupName]).toEqual(sumOfPassedValues);

    const firstGroupName = dateByYearTwoGroupsMock.groups[0].name;
    const firstGroupSumOfPassedValues = dateByYearTwoGroupsMock.groups[0].items
      .map((i) => i.value)
      .reduce((a, b) => a + b, 0);

    const secondGroupName = dateByYearTwoGroupsMock.groups[1].name;
    const secondGroupSumOfPassedValues = dateByYearTwoGroupsMock.groups[1].items
      .map((i) => i.value)
      .reduce((a, b) => a + b, 0);

    const passedMonthTwoGroups = <any>resultDateByYearForTwoGroups.data[groupIndexInDataSet];

    expect(passedMonthTwoGroups[firstGroupName]).toEqual(firstGroupSumOfPassedValues);
    expect(passedMonthTwoGroups[secondGroupName]).toEqual(secondGroupSumOfPassedValues);
  });

  it('processDateGroup() should return filled in by years flatten dataset with initialized values by 0 for single group/for two groups', () => {
    const singleGroupName = dateByYearSingleGroupMock.groups[0].name;
    const groupIndexInDataSet = 2; // as we added automatically 2 years before

    resultDateByYearForSingleGroup.data.forEach((d: any, index) => {
      if (index !== groupIndexInDataSet) {
        expect(d[singleGroupName]).toEqual(0);
      }
    });

    const firstGroupName = dateByYearTwoGroupsMock.groups[0].name;
    const secondGroupName = dateByYearTwoGroupsMock.groups[1].name;

    resultDateByYearForTwoGroups.data.forEach((d: any, index) => {
      if (index !== groupIndexInDataSet) {
        expect(d[firstGroupName]).toEqual(0);
        expect(d[secondGroupName]).toEqual(0);
      }
    });
  });

  it('loadSeriesData() should return flatten dataset for single group/two groups', () => {
    expect(resultSeriesSingleGroup).not.toBeNull();
    expect(resultSeriesTwoGroups).not.toBeNull();
  });

  it('loadSeriesData() should return filled in by dataset by series with non empty keys for single group/two groups', () => {
    resultSeriesSingleGroup.data.forEach((d) => {
      expect(d.key).not.toBeNull();
    });

    resultSeriesTwoGroups.data.forEach((d) => {
      expect(d.key).not.toBeNull();
    });
  });

  it('loadSeriesData() should return filled in flatten dataset by series with passed values in the single group/in each group of two groups', () => {
    const singleGroupName = seriesSingleGroupMock.groups[0].name;

    resultSeriesSingleGroup.data.forEach((d: any, index) => {
      expect(d[singleGroupName]).toEqual(seriesSingleGroupMock.groups[0].items[index].value);
      expect(d.key).toEqual(seriesSingleGroupMock.groups[0].items[index].key);
    });

    const firstGroupName = seriesTwoGroupsMock.groups[0].name;
    const secondGroupName = seriesTwoGroupsMock.groups[1].name;

    resultSeriesTwoGroups.data.forEach((d: any, index) => {
      expect(d[firstGroupName]).toEqual(seriesTwoGroupsMock.groups[0].items[index].value);
      expect(d[secondGroupName]).toEqual(seriesTwoGroupsMock.groups[1].items[index].value);

      expect(d.key).toEqual(seriesTwoGroupsMock.groups[0].items[index].key);
      expect(d.key).toEqual(seriesTwoGroupsMock.groups[1].items[index].key);
    });
  });
});
