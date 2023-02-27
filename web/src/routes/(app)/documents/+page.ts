import { loadDocuments } from "$lib/load";

export function load({ fetch }) {
    return loadDocuments(fetch);
}
