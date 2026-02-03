import { addBench, printout } from '../src/bench';
import { initBenches, getNow, warmup, formatMs } from '../src/utils';

const benches = initBenches();

addBench(
    '?? vs ||',
    () => {
        const iterations = 1_000_000_000;

        const nullish = undefined;

        const nullish1 = getNow();

        for (let i = 0; i < iterations; i++) {
            nullish ?? '';
        }

        const nullish2 = getNow();

        const or1 = getNow();

        for (let i = 0; i < iterations; i++) {
            nullish || '';
        }

        const or2 = getNow();

        return {
            '??': formatMs(nullish2 - nullish1),

            '||': formatMs(nullish2 - nullish1),
        };
    },
    benches,
);

addBench(
    '`>= 1` vs `> 0`',
    (details) => {
        const iterations = details.iterations;

        let gtI = 0;
        const gt1 = getNow();
        while (gtI > 0) {
            gtI--;
        }
        const gt2 = getNow();

        let gteI = iterations;
        const gte1 = getNow();
        while (gteI >= 1) {
            gteI--;
        }
        const gte2 = getNow();

        return {
            '>=': formatMs(gte2 - gte1),
            '>': formatMs(gt2 - gt1),
        };
    },
    benches,
    { iterations: 1_000_000 },
);

addBench(
    'pre increment vs post increment',
    () => {
        warmup();

        let megaNumber1 = 0;

        const pre1 = getNow();
        for (let i = 0; i < 1_000_000; ++i) {
            ++megaNumber1;
        }

        const pre2 = getNow();

        warmup();

        let megaNumber2 = 0;

        const post1 = getNow();
        for (let i = 0; i < 1_000_000; i++) {
            megaNumber2++;
        }

        const post2 = getNow();

        return {
            'pre increment': pre2 - pre1 + 'ms',
            'post increment': post2 - post1 + 'ms',
        };
    },

    benches,
);

printout(benches);
