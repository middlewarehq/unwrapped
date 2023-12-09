import { getTopNKeys } from '../utils';

test('getTopNKeys returns empty list for empty KeyValueObject Key and n=null', () => {
  expect(getTopNKeys({})).toStrictEqual([]);
});

test('getTopNKeys returns empty list for empty KeyValueObject Key and n=x', () => {
  expect(getTopNKeys({}, 0)).toStrictEqual([]);
  expect(getTopNKeys({}, 100)).toStrictEqual([]);
});

test('getTopNKeys returns list of all keys in desc order of values for KeyValueObject Key and n<0', () => {
  expect(getTopNKeys({ samad: 100, jayant: 0, eeshan: 2 }, -1)).toStrictEqual([
    'samad',
    'eeshan',
    'jayant'
  ]);
  expect(
    getTopNKeys({ samad: 100, jayant: 0, eeshan: 2, dhruv: 50 }, -1)
  ).toStrictEqual(['samad', 'dhruv', 'eeshan', 'jayant']);
});

test('getTopNKeys returns list of all keys in desc order of values for KeyValueObject Key and n<0', () => {
  expect(getTopNKeys({ samad: 100, jayant: 0, eeshan: 2 }, -1)).toStrictEqual([
    'samad',
    'eeshan',
    'jayant'
  ]);
  expect(
    getTopNKeys({ samad: 100, jayant: 0, eeshan: 2, dhruv: 50 }, -1)
  ).toStrictEqual(['samad', 'dhruv', 'eeshan', 'jayant']);
});

test('getTopNKeys returns list of all keys in desc order of values for KeyValueObject Key and n>=0', () => {
  expect(
    getTopNKeys(
      { samad: 100, jayant: 0, eeshan: 2, dhruv: 50, amogh: 400, sherub: 20 },
      0
    )
  ).toStrictEqual([]);

  expect(
    getTopNKeys(
      { samad: 100, jayant: 0, eeshan: 2, dhruv: 50, amogh: 400, sherub: 20 },
      1
    )
  ).toStrictEqual(['amogh']);

  expect(
    getTopNKeys(
      { samad: 100, jayant: 0, eeshan: 2, dhruv: 50, amogh: 400, sherub: 20 },
      3
    )
  ).toStrictEqual(['amogh', 'samad', 'dhruv']);

  expect(
    getTopNKeys(
      { samad: 100, jayant: 0, eeshan: 2, dhruv: 50, amogh: 400, sherub: 20 },
      100
    )
  ).toStrictEqual(['amogh', 'samad', 'dhruv', 'sherub', 'eeshan', 'jayant']);
});
