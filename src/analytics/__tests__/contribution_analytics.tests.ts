import {
  getContributionDaysList,
  getMonthWiseContributionCount
} from '../contribution_analytics';

const contributionData = {
  totalContributions: 2837,
  weeks: [
    {
      contributionDays: [
        {
          contributionCount: 1,
          date: '2023-01-01'
        },
        {
          contributionCount: 2,
          date: '2023-01-02'
        },
        {
          contributionCount: 6,
          date: '2023-01-03'
        },
        {
          contributionCount: 3,
          date: '2023-01-04'
        },
        {
          contributionCount: 17,
          date: '2023-01-05'
        },
        {
          contributionCount: 20,
          date: '2023-01-06'
        },
        {
          contributionCount: 0,
          date: '2023-01-07'
        }
      ]
    },
    {
      contributionDays: [
        {
          contributionCount: 2,
          date: '2023-01-08'
        },
        {
          contributionCount: 1,
          date: '2023-01-09'
        },
        {
          contributionCount: 2,
          date: '2023-01-10'
        },
        {
          contributionCount: 10,
          date: '2023-01-11'
        },
        {
          contributionCount: 12,
          date: '2023-01-12'
        },
        {
          contributionCount: 4,
          date: '2023-01-13'
        },
        {
          contributionCount: 8,
          date: '2023-01-14'
        }
      ]
    },
    {
      contributionDays: [
        {
          contributionCount: 1,
          date: '2023-01-15'
        },
        {
          contributionCount: 6,
          date: '2023-01-16'
        },
        {
          contributionCount: 14,
          date: '2023-01-17'
        },
        {
          contributionCount: 18,
          date: '2023-01-18'
        },
        {
          contributionCount: 13,
          date: '2023-01-19'
        },
        {
          contributionCount: 9,
          date: '2023-01-20'
        },
        {
          contributionCount: 0,
          date: '2023-01-21'
        }
      ]
    },
    {
      contributionDays: [
        {
          contributionCount: 2,
          date: '2023-01-22'
        },
        {
          contributionCount: 9,
          date: '2023-01-23'
        },
        {
          contributionCount: 3,
          date: '2023-01-24'
        },
        {
          contributionCount: 2,
          date: '2023-01-25'
        },
        {
          contributionCount: 14,
          date: '2023-01-26'
        },
        {
          contributionCount: 8,
          date: '2023-01-27'
        },
        {
          contributionCount: 2,
          date: '2023-01-28'
        }
      ]
    },
    {
      contributionDays: [
        {
          contributionCount: 0,
          date: '2023-01-29'
        },
        {
          contributionCount: 7,
          date: '2023-01-30'
        },
        {
          contributionCount: 7,
          date: '2023-01-31'
        },
        {
          contributionCount: 5,
          date: '2023-02-01'
        },
        {
          contributionCount: 23,
          date: '2023-02-02'
        },
        {
          contributionCount: 3,
          date: '2023-02-03'
        },
        {
          contributionCount: 3,
          date: '2023-02-04'
        }
      ]
    },
    {
      contributionDays: [
        {
          contributionCount: 3,
          date: '2023-02-05'
        },
        {
          contributionCount: 6,
          date: '2023-02-06'
        },
        {
          contributionCount: 5,
          date: '2023-02-07'
        },
        {
          contributionCount: 9,
          date: '2023-02-08'
        },
        {
          contributionCount: 15,
          date: '2023-02-09'
        },
        {
          contributionCount: 17,
          date: '2023-02-10'
        },
        {
          contributionCount: 1,
          date: '2023-02-11'
        }
      ]
    },
    {
      contributionDays: [
        {
          contributionCount: 0,
          date: '2023-02-12'
        },
        {
          contributionCount: 5,
          date: '2023-02-13'
        },
        {
          contributionCount: 6,
          date: '2023-02-14'
        },
        {
          contributionCount: 12,
          date: '2023-02-15'
        },
        {
          contributionCount: 15,
          date: '2023-02-16'
        },
        {
          contributionCount: 13,
          date: '2023-02-17'
        },
        {
          contributionCount: 11,
          date: '2023-02-18'
        }
      ]
    },
    {
      contributionDays: [
        {
          contributionCount: 1,
          date: '2023-02-19'
        },
        {
          contributionCount: 3,
          date: '2023-02-20'
        },
        {
          contributionCount: 13,
          date: '2023-02-21'
        },
        {
          contributionCount: 15,
          date: '2023-02-22'
        },
        {
          contributionCount: 4,
          date: '2023-02-23'
        },
        {
          contributionCount: 1,
          date: '2023-02-24'
        },
        {
          contributionCount: 5,
          date: '2023-02-25'
        }
      ]
    },
    {
      contributionDays: [
        {
          contributionCount: 0,
          date: '2023-02-26'
        },
        {
          contributionCount: 0,
          date: '2023-02-27'
        },
        {
          contributionCount: 2,
          date: '2023-02-28'
        },
        {
          contributionCount: 11,
          date: '2023-03-01'
        },
        {
          contributionCount: 17,
          date: '2023-03-02'
        },
        {
          contributionCount: 9,
          date: '2023-03-03'
        },
        {
          contributionCount: 3,
          date: '2023-03-04'
        }
      ]
    }
  ]
};

test('getContributionDaysList returns flat days list contribution data', () => {
  expect(getContributionDaysList(contributionData)).toStrictEqual([
    {
      contributionCount: 1,
      date: '2023-01-01'
    },
    {
      contributionCount: 2,
      date: '2023-01-02'
    },
    {
      contributionCount: 6,
      date: '2023-01-03'
    },
    {
      contributionCount: 3,
      date: '2023-01-04'
    },
    {
      contributionCount: 17,
      date: '2023-01-05'
    },
    {
      contributionCount: 20,
      date: '2023-01-06'
    },
    {
      contributionCount: 0,
      date: '2023-01-07'
    },
    {
      contributionCount: 2,
      date: '2023-01-08'
    },
    {
      contributionCount: 1,
      date: '2023-01-09'
    },
    {
      contributionCount: 2,
      date: '2023-01-10'
    },
    {
      contributionCount: 10,
      date: '2023-01-11'
    },
    {
      contributionCount: 12,
      date: '2023-01-12'
    },
    {
      contributionCount: 4,
      date: '2023-01-13'
    },
    {
      contributionCount: 8,
      date: '2023-01-14'
    },
    {
      contributionCount: 1,
      date: '2023-01-15'
    },
    {
      contributionCount: 6,
      date: '2023-01-16'
    },
    {
      contributionCount: 14,
      date: '2023-01-17'
    },
    {
      contributionCount: 18,
      date: '2023-01-18'
    },
    {
      contributionCount: 13,
      date: '2023-01-19'
    },
    {
      contributionCount: 9,
      date: '2023-01-20'
    },
    {
      contributionCount: 0,
      date: '2023-01-21'
    },
    {
      contributionCount: 2,
      date: '2023-01-22'
    },
    {
      contributionCount: 9,
      date: '2023-01-23'
    },
    {
      contributionCount: 3,
      date: '2023-01-24'
    },
    {
      contributionCount: 2,
      date: '2023-01-25'
    },
    {
      contributionCount: 14,
      date: '2023-01-26'
    },
    {
      contributionCount: 8,
      date: '2023-01-27'
    },
    {
      contributionCount: 2,
      date: '2023-01-28'
    },
    {
      contributionCount: 0,
      date: '2023-01-29'
    },
    {
      contributionCount: 7,
      date: '2023-01-30'
    },
    {
      contributionCount: 7,
      date: '2023-01-31'
    },
    {
      contributionCount: 5,
      date: '2023-02-01'
    },
    {
      contributionCount: 23,
      date: '2023-02-02'
    },
    {
      contributionCount: 3,
      date: '2023-02-03'
    },
    {
      contributionCount: 3,
      date: '2023-02-04'
    },
    {
      contributionCount: 3,
      date: '2023-02-05'
    },
    {
      contributionCount: 6,
      date: '2023-02-06'
    },
    {
      contributionCount: 5,
      date: '2023-02-07'
    },
    {
      contributionCount: 9,
      date: '2023-02-08'
    },
    {
      contributionCount: 15,
      date: '2023-02-09'
    },
    {
      contributionCount: 17,
      date: '2023-02-10'
    },
    {
      contributionCount: 1,
      date: '2023-02-11'
    },
    {
      contributionCount: 0,
      date: '2023-02-12'
    },
    {
      contributionCount: 5,
      date: '2023-02-13'
    },
    {
      contributionCount: 6,
      date: '2023-02-14'
    },
    {
      contributionCount: 12,
      date: '2023-02-15'
    },
    {
      contributionCount: 15,
      date: '2023-02-16'
    },
    {
      contributionCount: 13,
      date: '2023-02-17'
    },
    {
      contributionCount: 11,
      date: '2023-02-18'
    },
    {
      contributionCount: 1,
      date: '2023-02-19'
    },
    {
      contributionCount: 3,
      date: '2023-02-20'
    },
    {
      contributionCount: 13,
      date: '2023-02-21'
    },
    {
      contributionCount: 15,
      date: '2023-02-22'
    },
    {
      contributionCount: 4,
      date: '2023-02-23'
    },
    {
      contributionCount: 1,
      date: '2023-02-24'
    },
    {
      contributionCount: 5,
      date: '2023-02-25'
    },
    {
      contributionCount: 0,
      date: '2023-02-26'
    },
    {
      contributionCount: 0,
      date: '2023-02-27'
    },
    {
      contributionCount: 2,
      date: '2023-02-28'
    },
    {
      contributionCount: 11,
      date: '2023-03-01'
    },
    {
      contributionCount: 17,
      date: '2023-03-02'
    },
    {
      contributionCount: 9,
      date: '2023-03-03'
    },
    {
      contributionCount: 3,
      date: '2023-03-04'
    }
  ]);
});

test('getContributionDaysList returns flat empty list for empty contribution data', () => {
  expect(
    getContributionDaysList({
      totalContributions: 2837,
      weeks: []
    })
  ).toStrictEqual([]);
});

test('getMonthWiseContributionCount returns empty monthly contribution count', () => {
  let monthNumberToContributionsCountMap: any = {};

  for (let i = 0; i < 12; i++) monthNumberToContributionsCountMap[i] = 0;
  expect(
    getMonthWiseContributionCount({
      totalContributions: 0,
      weeks: []
    })
  ).toStrictEqual(monthNumberToContributionsCountMap);
});

test('getMonthWiseContributionCount returns correct monthly contribution count', () => {
  let monthNumberToContributionsCountMap: any = {};

  for (let i = 0; i < 12; i++) monthNumberToContributionsCountMap[i] = 0;

  monthNumberToContributionsCountMap[0] = 203;
  monthNumberToContributionsCountMap[1] = 196;
  monthNumberToContributionsCountMap[2] = 40;

  expect(getMonthWiseContributionCount(contributionData)).toStrictEqual(
    monthNumberToContributionsCountMap
  );
});
