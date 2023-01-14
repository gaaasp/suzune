import { Id } from "./utils";

export type Remark = {
    id: Id;
    title: string;
    reason: string;
    type: "LATE" | "MISS" | string;
    punishment?: string;
    justified?: boolean;
    date: string;
};
