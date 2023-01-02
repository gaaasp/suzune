import { CACHE_DURATION } from "config";
import { Account, Binder, DocumentData, DocumentFeature, Documents, Event, Grades, Homework, HomeworkStatus, Id, Message, Messages, MessageType, Obj } from "types/index";
import { isDeepStrictEqual } from "util";

export class Service {
    account: Account = undefined;
    params: Obj = undefined;
    cache: { [key: string]: [Function, [number, any, any][]] } = {}

    constructor(params: Obj) {
        this.params = params;
    }

    async addToCache(key: string, value: any, params?: any) {
        const i = this.cache[key][1].findIndex((c) => isDeepStrictEqual(c[2], params));
        if (i >= 0) {
            this.cache[key][1][i] = [Date.now(), value, params]
        } else this.cache[key][1].push([Date.now(), value, params]);
    }

    async fromCache(key: string, params?: any) {
        const fn = this.cache[key][0];
        const item = this.cache[key][1].find((c) => isDeepStrictEqual(c[2], params));
        if (!item || item[0] === null || item[0] < Date.now() - CACHE_DURATION) {
            const value = await fn(params);
            this.addToCache(key, value, params);
            return value;
        }
        else return item[1];
    }

    get config() {
        return {};
    }

    async login(_params: Obj): Promise<any> {}

    logout() {
        this.account = undefined;
    }

    async getBinders(): Promise<Binder[]> {
        return [];
    }

    async createBinder(_binder: { name: string; }): Promise<any> {}

    async editBinder(_binder: Binder): Promise<any> {}

    async deleteBinder(_id: Id): Promise<any> {}

    async getDocuments(_folder?: string): Promise<Documents> {
        return {
            all: {},
            homes: [],
        };
    }

    async getDocument(_id: Id): Promise<DocumentData> {
        return {
            type: "",
            content: new ArrayBuffer(0),
        };
    }

    async createDocument(_name: string, _content: ReadableStream, _feature: DocumentFeature, _folder?: Id): Promise<any> {}

    async deleteDocument(_id: Id): Promise<any> {}

    async getGrades(): Promise<Grades> {
        return {
            grades: [],
            periods: [],
            denominator: 20,
        };
    }

    async getHomeworks(_start?: string, _end?: string): Promise<Homework[]> {
        return [];
    }

    async editHomework(_id: Id, _homework: { status: HomeworkStatus }): Promise<any> {}

    async getMessages(_type: MessageType, _binder?: Id): Promise<Messages> {
        return {
            received: [],
            sent: [],
            binders: [],
        };
    }

    async getMessage(_id: Id, _type: MessageType): Promise<Message> {
        return undefined;
    }

    async getEvents(_start?: string, _end?: string): Promise<Event[]> {
        return [];
    }
}
