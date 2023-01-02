import { Id } from "./utils";

export type Grade = {
    id: Id;
    name: string;
    value: number | string;
    denominator: number;
    max?: number;
    min?: number;
    average?: number;
    rank?: number;
    meaningful: boolean;
    coefficient: number;
    date?: Date;
    added?: Date;
    subject?: Id;
    period?: Id;
};

export type Teacher = {
    id: Id;
    name: string;
};

export type Subject = {
    id: Id;
    name: string;
    emoji: string;
    value?: number;
    average?: number;
    min?: number;
    max?: number;
    coefficient: number;
    teachers: Teacher[];
    grades: Grade[];
};

export type Period = {
    id: Id;
    name: string;
    subjects: Subject[];
    start?: Date;
    end?: Date;
    value?: number;
    average?: number;
    min?: number;
    max?: number;
    calculation?: Date;
};

export type Grades = {
    periods: Period[];
    grades: Grade[];
    denominator: number;
}
