import { period } from "$lib/stores";
import type { Grades } from "$lib/types";

export async function loadGrades(p: number, integration: number, i: Grades) {
    if (typeof p !== "number") {
        let periods = i[integration || 0].data.periods.map((v: any, i: number) => [v, i]).filter(([{ start }]: any) => new Date(start).valueOf() < Date.now());
        if (periods.length === 0) {
            periods = i[integration || 0].data.periods.map((v: any, i: number) => [v, i]);
        }
        period.set(periods[periods.length - 1][1]);
    }
}
