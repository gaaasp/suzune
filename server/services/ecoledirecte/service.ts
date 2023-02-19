import { Service } from "services/service";
import { Binder, DocumentData, DocumentFeature, Documents, Event, Grades, Homework, HomeworkStatus, Id, Message, Messages, MessageType, Remark } from "types/index";
import { login } from "./auth";
import { LoginParams } from "./types/index";
import { getGrades } from "./grades";
import { createDocument, deleteDocument, getDocument, getDocuments } from "./documents";
import { getWorkspaces } from "./utils";
import { createMessage, editMessage, getMessage, getMessages } from "./messages";
import { editHomework, getHomeworks } from "./homeworks";
import { getEvents } from "./events";
import { createBinder, deleteBinder, editBinder } from "./binders";
import { getRemarks } from "./remarks";

export class EcoleDirecteService extends Service {
    #_raw = undefined;
    #token = undefined;
    #documents = {};

    constructor(params: LoginParams, id: Id) {
        super(params, id);
        this.cache = this.#cacheFunctions({
            workspaces: () => getWorkspaces(this.account, this.#token, this.#_raw),
            documents: async (folder?: string) => getDocuments(this.account, this.#token, this.#_raw, folder, await this.fromCache("workspaces")).then(({ documents, workspaces }) => {
                this.#documents = { ...this.#documents, ...documents.all };
                this.addToCache("workspaces", workspaces);
                return documents;
            }),
            document: (id: Id) => getDocument(this.#token, this.#documents[id]),
            grades: () => getGrades(this.account, this.#token),
            messages: ({ type, binder }: { type: MessageType; binder: Id }) => getMessages(this.account, this.#token, type, binder),
            message: ({ id, type }: { type: MessageType; id: Id }) => getMessage(this.account, this.#token, id, type),
            homeworks: ({ start, end }: { start: string; end: string }) => getHomeworks(this.account, this.#token, start, end),
            events: ({ start, end }: { start: string, end: string }) => getEvents(this.account, this.#token, start, end),
            remarks: () => getRemarks(this.account, this.#token),
        });
    }

    #cacheFunctions(cache: { [key: string]: Function }): { [key: string]: [Function, []] } {
        return Object.fromEntries(
            Object.entries(cache)
                .map(
                    ([key, fn]) => [
                        key,
                        [
                            (params: any) => !(this.#token && this.account) ? this.login().then(() => fn(params)) : fn(params).catch((err: any) => {
                                if (err?.message && err?.code && err.code !== 404 && !err.message.toLowerCase().includes("ip")) {
                                    this.login(this.params as LoginParams).then(() => fn(params));
                                } else throw err;
                            }),
                            []
                        ],
                    ]
                )
        );
    }


    get config() {
        return {
            id: "ecoledirecte",
            name: "EcoleDirecte",
        };
    }

    async login({
        username,
        password
    }: LoginParams = { username: "", password: "" }) {
        const { account, token, _raw } = await login(password ? { username, password } : this.params as LoginParams);

        this.account = account;
        this.#token = token;
        this.#_raw = _raw;

        return account;
    }

    async getBinders(): Promise<Binder[]> {
        return this.getMessages("received").then(({ binders }) => binders);
    }

    async createBinder(binder: { name: string }) {
        return createBinder(this.#token, binder);
    }

    async editBinder(binder: Binder) {
        return editBinder(this.#token, binder);
    }

    async deleteBinder(id: Id) {
        return deleteBinder(this.#token, id);
    }

    async getGrades(): Promise<Grades> {
        return this.fromCache("grades");
    }

    async getDocuments(folder?: Id): Promise<Documents> {
        return this.fromCache("documents", folder);
    }

    async getDocument(id: Id): Promise<DocumentData> {
        return this.fromCache("document", id);
    }

    async createDocument(name: string, content: ReadableStream, feature: DocumentFeature, folder?: Id) {
        return createDocument(this.#token, name, content, feature, folder);
    }

    async deleteDocument(id: Id) {
        return deleteDocument(this.account, this.#token, id);
    }

    async getMessages(type: MessageType, binder?: Id): Promise<Messages> {
        return this.fromCache("messages", { type, binder });
    }

    async getMessage(id: Id, type: MessageType): Promise<Message> {
        return this.fromCache("message", { id, type });
    }

    async createMessage({ content, title, documents, receivers, reply }: { content: string, title?: string, documents: any[], receivers: { id: Id, group?: Id}[], reply?: Message }) {
        return createMessage(this.account, this.#token, { content, title, documents, receivers, reply });
    }

    async editMessage(old: Message, message: Message) {
        return editMessage(this.account, this.#token, old, message);
    }

    async getHomeworks(start?: string, end?: string): Promise<Homework[]> {
        return this.fromCache("homeworks", { start, end });
    }

    async editHomework(id: Id, homework: { status: HomeworkStatus }) {
        return editHomework(this.account, this.#token, id, homework);
    }
    
    async getEvents(start?: string, end?: string): Promise<Event[]> {
        return this.fromCache("events", { start, end });
    }

    async getRemarks(): Promise<Remark[]> {
        return this.fromCache("remarks");
    }
};
