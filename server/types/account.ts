import { Id } from "./utils";

export type School = {
    id: Id;
    name: string;
};

export type Class = {
    id: Id;
    name: string;
}

export type AccountType = "STUDENT" | "PARENT" | "TEACHER" | "STAFF";

export type Account = {
    id: Id;
    name: string;
    type: AccountType;
    schools: School[];
    classes: Class[];
};
