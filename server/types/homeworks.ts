import type { Document } from "./documents";
import type { Id } from "./utils";

export type Homework = {
    id: Id;
    content?: string;
    session?: string;
    date: Date;
    added: Date;
    documents: Document[];
    teacher: string;
    subject: {
        name: string;
        emoji: string;
        id?: Id;
    },
    status: HomeworkStatus;
    options: {
        uploadable: boolean;
        exam: boolean;
    };
    returned: {
        id?: Id;
        name: string;
        date?: Date;
        size?: number;
    }[];
    comments: {
        id: Id;
        content: string;
        author: string;
        date?: Date;
    }[];
};

export type HomeworkStatus = "DONE" | "TODO" | "DISABLED";
