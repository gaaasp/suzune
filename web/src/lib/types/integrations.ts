import type { Grades as G } from "./grades";
import type { Documents as D } from "./documents";
import type { Homework } from "./homeworks";

type Service = {
    id: string;
    name: string;
};

type User = {
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

export type Integration<Data> = {
    id: number;
    service: Service;
    user: User;
    data: Data;
};

export type Grades = Integration<G>[];
export type ServerHomeworks = Integration<Homework[]>[];
export type Homeworks = { homework: Homework; integration: { id: number; service: Service; user: User } }[];
export type Documents = Integration<D>[];
