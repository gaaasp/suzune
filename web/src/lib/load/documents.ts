import { documents } from "$lib/stores";
import type { Documents } from "$lib/types";
import { request } from "$lib/utils";

export async function loadDocuments(fetch: Function, integration?: string | number, folder?: string | number) {
    return request(`documents?integrations=${integration || ""}&folder=${folder || ""}`, { fetch }).then((d: Documents) => {
        documents.update((integrations) => d.filter(({ data }) => data).map((integration) => {
            const oldIntegration = integrations?.find(({ id }) => id === integration.id);
            return { ...integration, data: { all: { ...(oldIntegration?.data?.all || {}), ...integration.data.all }, homes: folder ? (oldIntegration?.data?.homes || []) : integration.data.homes } }
        }));
    })
}
