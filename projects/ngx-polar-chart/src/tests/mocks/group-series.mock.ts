import {NgxSeriesGroup} from '../../lib/models/ngx-group-chart.model';

export const SeriesSingleGroupMock: NgxSeriesGroup = {
  groups: [
    {
      name: 'First group test',
      items: [
        {
          key: 'Test-A',
          value: 1,
        },
        {
          key: 'Test-B',
          value: 2,
        },
        {
          key: 'Test-C',
          value: 3,
        },
      ],
    },
  ],
};

export const SeriesTwoGroupsMock: NgxSeriesGroup = {
  groups: [
    {
      name: 'First group test',
      items: [
        {
          key: 'A',
          value: 1,
        },
        {
          key: 'B',
          value: 2,
        },
        {
          key: 'C',
          value: 3,
        },
      ],
    },
    {
      name: 'Second group test',
      items: [
        {
          key: 'A',
          value: 1,
        },
        {
          key: 'B',
          value: 2,
        },
        {
          key: 'C',
          value: 3,
        },
      ],
    },
  ],
};
