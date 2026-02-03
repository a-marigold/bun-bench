/**
 * The result of `Benchmark.callback` call.
 *
 *
 */
export type BenchmarkResult = { [name: string]: string };

export type Benchmark<DetailsK extends string, DetailsT> = {
    callback: BenchmarkCallback<DetailsK, DetailsT>;
    details?: BenchmarkDetails<DetailsK, DetailsT>;
};
/**
 *
 *
 *
 * Type of `BenchmarkDetails` of initial `Benchmarks` Map
 */
export type UnknownBenchmarkDetails = BenchmarkDetails<string, unknown>;
export type Benchmarks = Map<string, Benchmark<string, unknown>>;

export type BenchmarkCallback<DetailsK extends string, DetailsT = never> = [
    DetailsT,
] extends [never]
    ? () => BenchmarkResult
    : (details: BenchmarkDetails<DetailsK, DetailsT>) => BenchmarkResult;

/**
 *
 * Details object of benchmark
 */
export type BenchmarkDetails<K extends string, T = never> = [T] extends [never]
    ? undefined
    : {
          [name in K]: T;
      };

/**
 *
 * Type of `only` parameter in output functions like printout.
 */
export type OnlyBenchmarks = { [name: string]: boolean };

/**
 * Type of Output Function like `getMarkdown` and `printout`.=
 *
 * @param benchmarks `Map` with benchmarks to run.=
 *
 * @param only Record with names of benchmarks that will be run. All benchmarks will be run by default.=
 *
 *
 *
 *
 *
 *
 *
 *
 */
export type OutputFunction<T> = (
    benchmarks: Benchmarks,
    only?: OnlyBenchmarks,
) => T;
