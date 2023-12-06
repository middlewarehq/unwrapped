type BenchmarkResult = {
  executionTime: number; // in milliseconds
  memoryUsage: {
    residentSetSize: string; // in megabytes
    totalHeapSize: string; // in megabytes
    usedHeapSize: string; // in megabytes
    externalMemory: string; // in megabytes
    arrayBufferMemory: string; // in kilobytes
  };
  data: any;
};

function bytesToMegabytes(bytes: number): string {
  return (bytes / (1024 * 1024)).toFixed(2) + ' MB';
}

function bytesToKilobytes(bytes: number): string {
  return (bytes / 1024).toFixed(2) + ' KB';
}

export async function runBenchmark(
  callback: AnyAsyncFunction
): Promise<BenchmarkResult> {
  const startTimestamp = performance.now();

  // Execute the callback function
  const res = await callback();

  const endTimestamp = performance.now();
  const executionTime = endTimestamp - startTimestamp;
  const memoryUsage = process.memoryUsage();

  return {
    executionTime,
    memoryUsage: {
      residentSetSize: bytesToMegabytes(memoryUsage.rss),
      totalHeapSize: bytesToMegabytes(memoryUsage.heapTotal),
      usedHeapSize: bytesToMegabytes(memoryUsage.heapUsed),
      externalMemory: bytesToMegabytes(memoryUsage.external),
      arrayBufferMemory: bytesToKilobytes(memoryUsage.arrayBuffers)
    },
    data: res
  };
}
