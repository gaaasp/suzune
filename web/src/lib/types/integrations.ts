import type { Grades as G } from "./grades";
import type { Documents as D } from "./documents";
import type { Homework } from "./homeworks";

export type Integration<Data> = {
    id: number;
    service: {
        id: string;
        name: string;
    };
    user: {
        name: string;
        id: number | string;
        type: string;
        schools: {
            name: string;
            id: number | string;
        }[];
        classes: {
            name: string;
            id: number | string;
        }[];
    };
    data: Data;
};

export type Grades = Integration<G>[];
export type Homeworks = Integration<Homework[]>[];
export type Documents = Integration<D>[];
