import { BoolObj, Id } from "./utils";

export type Document = {
    id: Id;
    name: string;
    kind: "folder" | "file" | "url";
    type?: string;
    children?: Id[];
    size?: number;
    date?: Date;
    owner?: string;
    content?: string;
    options?: BoolObj;
    description?: string;
    _raw?: any;
};

export type Documents = {
    all: { [key: Id]: Document };
    homes: Id[];
};

export type DocumentData = {
    type: string;
    content: ArrayBuffer;
};

export type DocumentFeature = "documents" | "homeworks" | "messages";
