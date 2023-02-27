import { documents } from "$lib/stores";
import type { Documents } from "$lib/types";
import { request } from "$lib/utils";

export async function loadDocuments(integration?: string | number, folder?: string | number) {
    return request(`documents?integrations=${integration || ""}&folder=${folder || ""}`).then((d: Documents) => {
        documents.update((integrations) => d.map((integration) => {
            const oldIntegration = integrations?.find(({ id }) => id === integration.id);
            return { ...integration, data: { all: { ...(oldIntegration?.data?.all || {}), ...integration.data.all }, homes: folder ? (oldIntegration?.data?.homes || []) : integration.data.homes } }
        }));
    })
}
