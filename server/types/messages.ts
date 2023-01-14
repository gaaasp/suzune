import { Binder } from "./binders";
import { Document } from "./documents";
import { Id } from "./utils";

export type Message = {
    id: Id;
    title: string;
    type: MessageType;
    content: string;
    date: Date;
    binders: Id[];
    author: {
        id: Id;
        name: string;
    };
    documents: Document[];
    receivers: {
        id: Id;
        name: string;
    }[];
    _raw: any;
};

export type MessageType = "sent" | "received";

export type Messages = {
    sent: Message[];
    received: Message[];
    binders: Binder[];
};
