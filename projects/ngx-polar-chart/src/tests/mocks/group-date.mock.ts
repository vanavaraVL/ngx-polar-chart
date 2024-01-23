import {NgxDateGroup, NgxGroupBy} from '../../lib/models/ngx-group-chart.model';

export const now: Date = new Date();

export const DateSingleGroupGroupedByDayMock: NgxDateGroup = {
  groups: [
    {
      name: 'First group test',
      items: [
        {
          key: new Date(now.getFullYear(), now.getMonth(), 1),
          value: 1,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 2),
          value: 2,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 3),
          value: 3,
        },
      ],
    },
  ],
};

export const DateSingleGroupGroupedByMonthMock: NgxDateGroup = {
  groupBy: NgxGroupBy.month,
  groups: [
    {
      name: 'First group test',
      items: [
        {
          key: new Date(now.getFullYear(), now.getMonth(), 1),
          value: 1,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 2),
          value: 2,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 3),
          value: 3,
        },
      ],
    },
  ],
};

export const DateSingleGroupGroupedByYearMock: NgxDateGroup = {
  groupBy: NgxGroupBy.year,
  groups: [
    {
      name: 'First group test',
      items: [
        {
          key: new Date(now.getFullYear(), now.getMonth(), 1),
          value: 1,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 2),
          value: 2,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 3),
          value: 3,
        },
      ],
    },
  ],
};

export const DateTwoGroupsGroupedByDayMock: NgxDateGroup = {
  groups: [
    {
      name: 'First group test',
      items: [
        {
          key: new Date(now.getFullYear(), now.getMonth(), 1),
          value: 1,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 2),
          value: 2,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 3),
          value: 3,
        },
      ],
    },
    {
      name: 'Second group test',
      items: [
        {
          key: new Date(now.getFullYear(), now.getMonth(), 1),
          value: 1,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 2),
          value: 2,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 3),
          value: 3,
        },
      ],
    },
  ],
};

export const DateTwoGroupsGroupedByMonthMock: NgxDateGroup = {
  groupBy: NgxGroupBy.month,
  groups: [
    {
      name: 'First group test',
      items: [
        {
          key: new Date(now.getFullYear(), now.getMonth(), 1),
          value: 1,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 2),
          value: 2,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 3),
          value: 3,
        },
      ],
    },
    {
      name: 'Second group test',
      items: [
        {
          key: new Date(now.getFullYear(), now.getMonth(), 1),
          value: 1,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 2),
          value: 2,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 3),
          value: 3,
        },
      ],
    },
  ],
};

export const DateTwoGroupsGroupedByYearMock: NgxDateGroup = {
  groupBy: NgxGroupBy.year,
  groups: [
    {
      name: 'First group test',
      items: [
        {
          key: new Date(now.getFullYear(), now.getMonth(), 1),
          value: 1,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 2),
          value: 2,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 3),
          value: 3,
        },
      ],
    },
    {
      name: 'Second group test',
      items: [
        {
          key: new Date(now.getFullYear(), now.getMonth(), 1),
          value: 1,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 2),
          value: 2,
        },
        {
          key: new Date(now.getFullYear(), now.getMonth(), 3),
          value: 3,
        },
      ],
    },
  ],
};
