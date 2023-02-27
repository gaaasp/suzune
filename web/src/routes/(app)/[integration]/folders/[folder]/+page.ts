import { loadDocuments } from "$lib/load";

export function load({ fetch, params }) {
    return loadDocuments(fetch, params.integration, params.folder);
}
