import { getRemarks } from "services/ecoledirecte/remarks";
import { SERVICES } from "services/list";
import { Service } from "services/service";
import { createIntegration, getIntegrations } from "services/utils"
import { MessageType } from "types/messages";
import { Id, Obj } from "types/utils";

export class Account {
    id: Id = undefined
    integrations: Service[] = []
    session = {};

    constructor(id: Id) {
        this.id = id;
    }

    async getIntegrations() {
        const integrations = await getIntegrations(this.id)
        this.integrations = integrations.map(({ id, service, params }) => {
            const integration = this.integrations.find(s => s.id === id);
            if (integration) {
                return integration;
            } else {
                const s = new SERVICES[service](params, id);
                s.login();
                return s;
            }
        });
        return integrations;
    }

    async createIntegration({ params, service }: { params: Obj, service: string }) {
        await createIntegration({ user: this.id, params, service });
        return this.getIntegrations();
    }

    async #forIntegrations(integrations: string, fn: (service: Service) => any) {
        let i = this.integrations;
        if (integrations) {
            const parsedIntegrations = integrations.split(",");
            i = i.filter(integration => parsedIntegrations.find(id => id === integration.id));
        }
        return Promise.all(i.map(async service => ({
            id: service.id,
            data: await fn(service),
        })));
    }

    async getHomeworks(integrations: string, start?: string, end?: string) {
        return this.#forIntegrations(integrations, service => service.getHomeworks(start, end));
    }

    async getGrades(integrations: string) {
        return this.#forIntegrations(integrations, service => service.getGrades());
    }

    async getMessages(integrations: string, type: MessageType, binder?: Id) {
        return this.#forIntegrations(integrations, service => service.getMessages(type, binder));
    }

    async getBinders(integrations: string) {
        return this.#forIntegrations(integrations, service => service.getBinders());
    }

    async getEvents(integrations: string, start?: string, end?: string) {
        return this.#forIntegrations(integrations, service => service.getEvents(start, end));
    }

    async getDocuments(integrations: string, folder?: Id) {
        return this.#forIntegrations(integrations, service => service.getDocuments(folder));
    }

    async getRemarks(integrations: string) {
        return this.#forIntegrations(integrations, service => service.getRemarks());
    }

    async getMessage(integrations: string, id: Id, type: MessageType) {
        return this.#forIntegrations(integrations, service => service.getMessage(id, type));
    }

    async getDocument(integrations: string, id: Id) {
        return this.#forIntegrations(integrations, service => service.getDocument(id));
    }
}
