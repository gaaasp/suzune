import { loadDocuments } from "$lib/load";
import { request } from "$lib/utils";

export function load({ fetch, params }) {
    const path = `documents/${encodeURIComponent(params.file)}?integrations=${params.integration}`;
    return loadDocuments(fetch, params.integration, params.folder).then(() =>
        request(path, { custom: true, fetch })
            .then(async res => {
                let type = res.headers.get("content-type");
                let content = type === "application/pdf" ? res.arrayBuffer() : res.text();
                return { type, content };
            })
    );
}
