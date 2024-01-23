import {TestBed} from '@angular/core/testing';

import {PolarChartGroupService} from './polar-chart-group.service';
import {ConfigureTestBed} from '../../tests/_configureTestBed';
import {TestServices} from '../../tests/test.services';
import {NgxDateGroup} from '../models/ngx-group-chart.model';
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

describe('NgxPolarChart services', () => {
  let services: TestServices;
  let groupService: PolarChartGroupService;

  let groupDateByDaySingleGroupMock: NgxDateGroup;
  let groupDateByMonthSingleGroupMock: NgxDateGroup;
  let groupDateByYearSingleGroupMock: NgxDateGroup;

  let groupDateByDayTwoGroupsMock: NgxDateGroup;
  let groupDateByMonthTwoGroupsMock: NgxDateGroup;
  let groupDateByYearTwoGroupsMock: NgxDateGroup;

  let dateNow: Date;

  let resultGroupDateByDayForSingleGroup: GroupDataSetModel;
  let resultGroupDateByMonthForSingleGroup: GroupDataSetModel;
  let resultGroupDateByYearForSingleGroup: GroupDataSetModel;

  let resultGroupDateByDayForTwoGroups: GroupDataSetModel;
  let resultGroupDateByMonthForTwoGroups: GroupDataSetModel;
  let resultGroupDateByYearForTwoGroups: GroupDataSetModel;

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

    resultGroupDateByDayForSingleGroup = groupService.processDateGroup(groupDateByDaySingleGroupMock);
    resultGroupDateByMonthForSingleGroup = groupService.processDateGroup(groupDateByMonthSingleGroupMock);
    resultGroupDateByYearForSingleGroup = groupService.processDateGroup(groupDateByYearSingleGroupMock);

    resultGroupDateByDayForTwoGroups = groupService.processDateGroup(groupDateByDayTwoGroupsMock);
    resultGroupDateByMonthForTwoGroups = groupService.processDateGroup(groupDateByMonthTwoGroupsMock);
    resultGroupDateByYearForTwoGroups = groupService.processDateGroup(groupDateByYearTwoGroupsMock);

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

  it('processDateGroup() should return filled in flatten dataset with passed values single grou/in each group of two groups', () => {
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
});
