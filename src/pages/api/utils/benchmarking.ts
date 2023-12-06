function bytesToMegabytes(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function bytesToKilobytes(bytes: number): string {
  return (bytes / 1024).toFixed(2) + ' KB';
}

export const runBenchmark = async <T>(
  callback: () => Promise<T>
): Promise<T> => {
  const startTimestamp = performance.now();

  const res = await callback();

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
  console.log('\x1b[36m%s\x1b[0m', JSON.stringify(benchmarkResult, null, 2));
  return res;
};
