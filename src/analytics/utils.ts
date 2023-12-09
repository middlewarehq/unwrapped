import { KeyValueObject } from '@/types';

export function getTopNKeys(obj: KeyValueObject, n?: number): string[] {
  let keyValueArray: [string, number][] = Object.entries(obj);
  keyValueArray.sort((a, b) => b[1] - a[1]);

  if (n === null || n === undefined || n < 0) {
    return keyValueArray.map((arr) => arr[0]);
  }

  return keyValueArray.slice(0, n).map((arr) => arr[0]);
}
