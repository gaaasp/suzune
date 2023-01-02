import { Id } from "./utils";

export type Event = {
    id: Id;
    type: "LESSON" | "EXAM" | "KHOLLE" | "SPECIAL";
    start: Date;
    end: Date;
    teacher: string;
    room?: string;
    title: string;
    subject?: {
        name: string;
        emoji: string;
        id?: Id;
    };
    options: {
        cancelled: boolean;
    };
};
