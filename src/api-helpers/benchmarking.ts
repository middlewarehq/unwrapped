import chalk from 'chalk';
import { DEV } from '../constants/general';

function bytesToMegabytes(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function bytesToKilobytes(bytes: number): string {
  return (bytes / 1024).toFixed(2) + ' KB';
}

export const runBenchmark = async <T>(
  callback: (...args: any[]) => Promise<T>,
  ...args: any[]
): Promise<T> => {
  if (process.env.NEXT_PUBLIC_APP_ENVIRONMENT !== DEV) {
    return await callback(...args);
  }
  const startTimestamp = performance.now();

  const res = await callback(...args);

  const endTimestamp = performance.now();
  const executionTime = endTimestamp - startTimestamp;
  const memoryUsage = process.memoryUsage();

  const benchmarkResult = {
    executionTime: executionTime.toFixed(2) + ' ms',
    memoryUsage: {
      residentSetSize: bytesToMegabytes(memoryUsage.rss),
      totalHeapSize: bytesToMegabytes(memoryUsage.heapTotal),
      usedHeapSize: bytesToMegabytes(memoryUsage.heapUsed),
      externalMemory: bytesToMegabytes(memoryUsage.external),
      arrayBufferMemory: bytesToKilobytes(memoryUsage.arrayBuffers)
    },
    function: callback.name,
    response: JSON.stringify(res).slice(0, 100) + '...'
  };
  console.log(
    chalk.cyan('Benchmark results', JSON.stringify(benchmarkResult, null, 2))
  );
  return res;
};
