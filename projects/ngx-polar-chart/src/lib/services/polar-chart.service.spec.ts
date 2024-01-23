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
import {GroupDataSetModel} from '../models/chart.model';
import {SeriesSingleGroupMock, SeriesTwoGroupsMock} from '../../tests/mocks/group-series.mock';

describe('group services', () => {
  let services: TestServices;
  let groupService: PolarChartService;

  let groupDateByDaySingleGroupMock: NgxDateGroup;
  let groupDateByMonthSingleGroupMock: NgxDateGroup;
  let groupDateByYearSingleGroupMock: NgxDateGroup;

  let groupDateByDayTwoGroupsMock: NgxDateGroup;
  let groupDateByMonthTwoGroupsMock: NgxDateGroup;
  let groupDateByYearTwoGroupsMock: NgxDateGroup;

  let dateNow: Date;

  /*
    Flatten data (has run in January):
    {
       {key: 'Jan`1', 'First group test': 1}
       {key: 'Jan`2', 'First group test': 2}
       {key: 'Jan`3', 'First group test': 3}
    }
  */
  let resultGroupDateByDayForSingleGroup: GroupDataSetModel;

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
  let resultGroupDateByMonthForSingleGroup: GroupDataSetModel;

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
  let resultGroupDateByYearForSingleGroup: GroupDataSetModel;

  /*
    Flatten data (has run in January):
    {
       {key: 'Jan`1', 'First group test': 1, 'Second group test': 1}
       {key: 'Jan`2', 'First group test': 2, 'Second group test': 2}
       {key: 'Jan`3', 'First group test': 3, 'Second group test': 3}
    }
  */
  let resultGroupDateByDayForTwoGroups: GroupDataSetModel;

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
  let resultGroupDateByMonthForTwoGroups: GroupDataSetModel;

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
  let resultGroupDateByYearForTwoGroups: GroupDataSetModel;

  let groupSeriesSingleGroupMock: NgxSeriesGroup;
  let groupSeriesTwoGroupsMock: NgxSeriesGroup;

  /*
    Flatten data:
    {
       {key: 'Test-A', 'First group test': 1}
       {key: 'Test-B', 'First group test': 2}
       {key: 'Test-C', 'First group test': 3}
    }
  */
  let resultGroupSeriesSingleGroup: GroupDataSetModel;

  /*
    Flatten data:
    {
       {key: 'A', 'First group test': 1, 'Second group test': 1}
       {key: 'B', 'First group test': 2, 'Second group test': 2}
       {key: 'C', 'First group test': 3, 'Second group test': 3}
    }
  */
  let resultGroupSeriesTwoGroups: GroupDataSetModel;

  beforeEach(() => {
    ConfigureTestBed();
    services = TestBed.inject(TestServices);

    groupService = services.groupService;

    groupDateByDaySingleGroupMock = cloneDeep(DateSingleGroupGroupedByDayMock);
    groupDateByMonthSingleGroupMock = cloneDeep(DateSingleGroupGroupedByMonthMock);
    groupDateByYearSingleGroupMock = cloneDeep(DateSingleGroupGroupedByYearMock);

    groupDateByDayTwoGroupsMock = cloneDeep(DateTwoGroupsGroupedByDayMock);
    groupDateByMonthTwoGroupsMock = cloneDeep(DateTwoGroupsGroupedByMonthMock);
    groupDateByYearTwoGroupsMock = cloneDeep(DateTwoGroupsGroupedByYearMock);

    groupSeriesSingleGroupMock = cloneDeep(SeriesSingleGroupMock);
    groupSeriesTwoGroupsMock = cloneDeep(SeriesTwoGroupsMock);

    resultGroupDateByDayForSingleGroup = groupService.processDateGroup(groupDateByDaySingleGroupMock);
    resultGroupDateByMonthForSingleGroup = groupService.processDateGroup(groupDateByMonthSingleGroupMock);
    resultGroupDateByYearForSingleGroup = groupService.processDateGroup(groupDateByYearSingleGroupMock);

    resultGroupDateByDayForTwoGroups = groupService.processDateGroup(groupDateByDayTwoGroupsMock);
    resultGroupDateByMonthForTwoGroups = groupService.processDateGroup(groupDateByMonthTwoGroupsMock);
    resultGroupDateByYearForTwoGroups = groupService.processDateGroup(groupDateByYearTwoGroupsMock);

    resultGroupSeriesSingleGroup = groupService.processSeriesGroup(groupSeriesSingleGroupMock);
    resultGroupSeriesTwoGroups = groupService.processSeriesGroup(groupSeriesTwoGroupsMock);

    dateNow = now;
  });

  it('service should be created', () => {
    expect(services).toBeTruthy();
  });

  it('group service should be created', () => {
    expect(groupService).toBeTruthy();
  });

  it('processDateGroup() should return flatten dataset for single group/two groups', () => {
    expect(resultGroupDateByDayForSingleGroup).not.toBeNull();
    expect(resultGroupDateByDayForTwoGroups).not.toBeNull();
  });

  it('processDateGroup() should return filled in by all days in current month flatten dataset for single group/two groups', () => {
    const daysInMonth = +moment(dateNow).endOf('month').format('D');

    expect(resultGroupDateByDayForSingleGroup.data.length).toEqual(daysInMonth);
    expect(resultGroupDateByDayForTwoGroups.data.length).toEqual(daysInMonth);
  });

  it('processDateGroup() should return filled in flatten dataset with passed values in the single group/in each group of two groups', () => {
    const singleGroup = groupDateByDaySingleGroupMock.groups[0].items;
    const singleGroupName = groupDateByDaySingleGroupMock.groups[0].name;

    resultGroupDateByDayForSingleGroup.data.forEach((d: any, index) => {
      if (index < singleGroup.length) {
        expect(d[singleGroupName]).toEqual(groupDateByDaySingleGroupMock.groups[0].items[index].value);
      }
    });

    const firstGroup = groupDateByDayTwoGroupsMock.groups[0].items;
    const secondGroup = groupDateByDayTwoGroupsMock.groups[1].items;
    const firstGroupName = groupDateByDayTwoGroupsMock.groups[0].name;
    const secondGroupName = groupDateByDayTwoGroupsMock.groups[1].name;

    resultGroupDateByDayForTwoGroups.data.forEach((d: any, index) => {
      if (index < firstGroup.length) {
        expect(d[firstGroupName]).toEqual(groupDateByDayTwoGroupsMock.groups[0].items[index].value);
      }

      if (index < secondGroup.length) {
        expect(d[secondGroupName]).toEqual(groupDateByDayTwoGroupsMock.groups[1].items[index].value);
      }
    });
  });

  it('processDateGroup() should return filled in by all days in current month flatten dataset with initialized values by 0 for single group/in each of two groups', () => {
    const singleGroup = groupDateByDaySingleGroupMock.groups[0].items;
    const singleGroupName = groupDateByDaySingleGroupMock.groups[0].name;

    resultGroupDateByDayForSingleGroup.data.forEach((d: any, index) => {
      if (singleGroup.length < index) {
        expect(d[singleGroupName]).toEqual(0);
      }
    });

    const firstGroup = groupDateByDayTwoGroupsMock.groups[0].items;
    const secondGroup = groupDateByDayTwoGroupsMock.groups[1].items;
    const firstGroupName = groupDateByDayTwoGroupsMock.groups[0].name;
    const secondGroupName = groupDateByDayTwoGroupsMock.groups[1].name;

    resultGroupDateByDayForTwoGroups.data.forEach((d: any, index) => {
      if (firstGroup.length < index) {
        expect(d[firstGroupName]).toEqual(0);
      }

      if (secondGroup.length < index) {
        expect(d[secondGroupName]).toEqual(0);
      }
    });
  });

  it('processDateGroup() should return filled in by all days in current month flatten dataset with non empty keys for single group/two groups', () => {
    resultGroupDateByDayForSingleGroup.data.forEach((d) => {
      expect(d.key).not.toBeNull();
    });

    resultGroupDateByDayForTwoGroups.data.forEach((d) => {
      expect(d.key).not.toBeNull();
    });
  });

  it('processDateGroup() should return filled in by all days in current month flatten dataset with formatted keys for single group/two groups', () => {
    resultGroupDateByDayForSingleGroup.data.forEach((d, index) => {
      const currentKey = moment(new Date(now.getFullYear(), now.getMonth(), ++index)).format('MMM`D');

      expect(d.key).toEqual(currentKey);
    });

    resultGroupDateByDayForTwoGroups.data.forEach((d, index) => {
      const currentKey = moment(new Date(now.getFullYear(), now.getMonth(), ++index)).format('MMM`D');

      expect(d.key).toEqual(currentKey);
    });
  });

  it('processDateGroup() should return filled in by all months in current year flatten dataset for single group/two groups', () => {
    const monthsInYear = 12;

    expect(resultGroupDateByMonthForSingleGroup.data.length).toEqual(monthsInYear);
    expect(resultGroupDateByMonthForTwoGroups.data.length).toEqual(monthsInYear);
  });

  it('processDateGroup() should return filled in by all months in current year flatten dataset with formatted keys [months names] for single group/two groups', () => {
    const months = moment.months();

    resultGroupDateByMonthForSingleGroup.data.forEach((d, index) => {
      expect(d.key).toEqual(months[index]);
    });

    resultGroupDateByMonthForTwoGroups.data.forEach((d, index) => {
      expect(d.key).toEqual(months[index]);
    });
  });

  it('processDateGroup() should return filled in by all months in current year flatten dataset with sum of passed values for single group/two groups', () => {
    const singleGroupName = groupDateByMonthSingleGroupMock.groups[0].name;
    const sumOfPassedValues = groupDateByMonthSingleGroupMock.groups[0].items
      .map((i) => i.value)
      .reduce((a, b) => a + b, 0);

    const currentMonth = +moment(now).format('M');
    const passedMonth = <any>resultGroupDateByMonthForSingleGroup.data[currentMonth - 1];

    expect(passedMonth[singleGroupName]).toEqual(sumOfPassedValues);

    const firstGroupName = groupDateByMonthTwoGroupsMock.groups[0].name;
    const firstGroupSumOfPassedValues = groupDateByMonthTwoGroupsMock.groups[0].items
      .map((i) => i.value)
      .reduce((a, b) => a + b, 0);

    const secondGroupName = groupDateByMonthTwoGroupsMock.groups[1].name;
    const secondGroupSumOfPassedValues = groupDateByMonthTwoGroupsMock.groups[1].items
      .map((i) => i.value)
      .reduce((a, b) => a + b, 0);

    const passedMonthTwoGroups = <any>resultGroupDateByMonthForTwoGroups.data[currentMonth - 1];

    expect(passedMonthTwoGroups[firstGroupName]).toEqual(firstGroupSumOfPassedValues);
    expect(passedMonthTwoGroups[secondGroupName]).toEqual(secondGroupSumOfPassedValues);
  });

  it('processDateGroup() should return filled in by all months in current year flatten dataset with initialized values by 0 for single group/two groups', () => {
    const singleGroupName = groupDateByDaySingleGroupMock.groups[0].name;

    resultGroupDateByMonthForSingleGroup.data.forEach((d: any, index) => {
      if (0 < index) {
        expect(d[singleGroupName]).toEqual(0);
      }
    });

    const firstGroupName = groupDateByMonthTwoGroupsMock.groups[0].name;
    const secondGroupName = groupDateByMonthTwoGroupsMock.groups[1].name;

    resultGroupDateByMonthForTwoGroups.data.forEach((d: any, index) => {
      if (0 < index) {
        expect(d[firstGroupName]).toEqual(0);
        expect(d[secondGroupName]).toEqual(0);
      }
    });
  });

  it('processDateGroup() should return filled in by years flatten dataset for single group/two groups', () => {
    const onePassedAndAddedFourYears = 5;

    expect(resultGroupDateByYearForSingleGroup.data.length).toEqual(onePassedAndAddedFourYears);
    expect(resultGroupDateByYearForTwoGroups.data.length).toEqual(onePassedAndAddedFourYears);
  });

  it('processDateGroup() should return filled in by years flatten dataset with formatted keys [years names] for single group/two groups', () => {
    const currentYear = now.getFullYear();

    const years: number[] = [currentYear - 2, currentYear - 1, currentYear, currentYear + 1, currentYear + 2];

    resultGroupDateByYearForSingleGroup.data.forEach((d, index) => {
      expect(+d.key).toEqual(years[index]);
    });

    resultGroupDateByYearForTwoGroups.data.forEach((d, index) => {
      expect(+d.key).toEqual(years[index]);
    });
  });

  it('processDateGroup() should return filled in by years flatten dataset with sum of passed values for single group/two groups', () => {
    const singleGroupName = groupDateByYearSingleGroupMock.groups[0].name;
    const sumOfPassedValues = groupDateByYearSingleGroupMock.groups[0].items
      .map((i) => i.value)
      .reduce((a, b) => a + b, 0);
    const groupIndexInDataSet = 2; // as we added automatically 2 years before

    const passedMonth = <any>resultGroupDateByYearForSingleGroup.data[groupIndexInDataSet];

    expect(passedMonth[singleGroupName]).toEqual(sumOfPassedValues);

    const firstGroupName = groupDateByYearTwoGroupsMock.groups[0].name;
    const firstGroupSumOfPassedValues = groupDateByYearTwoGroupsMock.groups[0].items
      .map((i) => i.value)
      .reduce((a, b) => a + b, 0);

    const secondGroupName = groupDateByYearTwoGroupsMock.groups[1].name;
    const secondGroupSumOfPassedValues = groupDateByYearTwoGroupsMock.groups[1].items
      .map((i) => i.value)
      .reduce((a, b) => a + b, 0);

    const passedMonthTwoGroups = <any>resultGroupDateByYearForTwoGroups.data[groupIndexInDataSet];

    expect(passedMonthTwoGroups[firstGroupName]).toEqual(firstGroupSumOfPassedValues);
    expect(passedMonthTwoGroups[secondGroupName]).toEqual(secondGroupSumOfPassedValues);
  });

  it('processDateGroup() should return filled in by years flatten dataset with initialized values by 0 for single group/for two groups', () => {
    const singleGroupName = groupDateByYearSingleGroupMock.groups[0].name;
    const groupIndexInDataSet = 2; // as we added automatically 2 years before

    resultGroupDateByYearForSingleGroup.data.forEach((d: any, index) => {
      if (index !== groupIndexInDataSet) {
        expect(d[singleGroupName]).toEqual(0);
      }
    });

    const firstGroupName = groupDateByYearTwoGroupsMock.groups[0].name;
    const secondGroupName = groupDateByYearTwoGroupsMock.groups[1].name;

    resultGroupDateByYearForTwoGroups.data.forEach((d: any, index) => {
      if (index !== groupIndexInDataSet) {
        expect(d[firstGroupName]).toEqual(0);
        expect(d[secondGroupName]).toEqual(0);
      }
    });
  });

  it('loadSeriesData() should return flatten dataset for single group/two groups', () => {
    expect(resultGroupSeriesSingleGroup).not.toBeNull();
    expect(resultGroupSeriesTwoGroups).not.toBeNull();
  });

  it('loadSeriesData() should return filled in by dataset by series with non empty keys for single group/two groups', () => {
    resultGroupSeriesSingleGroup.data.forEach((d) => {
      expect(d.key).not.toBeNull();
    });

    resultGroupSeriesTwoGroups.data.forEach((d) => {
      expect(d.key).not.toBeNull();
    });
  });

  it('loadSeriesData() should return filled in flatten dataset by series with passed values in the single group/in each group of two groups', () => {
    const singleGroupName = groupSeriesSingleGroupMock.groups[0].name;

    resultGroupSeriesSingleGroup.data.forEach((d: any, index) => {
      expect(d[singleGroupName]).toEqual(groupSeriesSingleGroupMock.groups[0].items[index].value);
      expect(d.key).toEqual(groupSeriesSingleGroupMock.groups[0].items[index].key);
    });

    const firstGroupName = groupSeriesTwoGroupsMock.groups[0].name;
    const secondGroupName = groupSeriesTwoGroupsMock.groups[1].name;

    resultGroupSeriesTwoGroups.data.forEach((d: any, index) => {
      expect(d[firstGroupName]).toEqual(groupSeriesTwoGroupsMock.groups[0].items[index].value);
      expect(d[secondGroupName]).toEqual(groupSeriesTwoGroupsMock.groups[1].items[index].value);

      expect(d.key).toEqual(groupSeriesTwoGroupsMock.groups[0].items[index].key);
      expect(d.key).toEqual(groupSeriesTwoGroupsMock.groups[1].items[index].key);
    });
  });
});
