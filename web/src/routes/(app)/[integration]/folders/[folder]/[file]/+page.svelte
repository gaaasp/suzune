<script lang="ts">
    import { page } from "$app/stores";
    import { DocumentParents } from "$lib/components/documents";
    import { Skeleton, SkeletonGroup } from "$lib/components/loading";
    import { Back, Card, MainHeader, Text, Wrapper } from "$lib/components/ui";
    import { loadDocuments } from "$lib/load";
    import { documents } from "$lib/stores";
    import { capitalize, cn, formatDate, formatSize, list, request, serverURL } from "$lib/utils";
    import { renderPDF } from "$lib/utils/pdf";
    import { onMount } from "svelte";

    let content: string;
    let type: string;
    let pdf: HTMLElement;

    const path = `documents/${encodeURIComponent($page.params.file)}?integrations=${$page.params.integration}`;
    const url = serverURL(path);

    onMount(() => {
        loadDocuments($page.params.integration, $page.params.folder);
        request(path, { custom: true })
            .then(async res => {
                type = res.headers.get("content-type");
                if (type === "application/pdf") {
                    const ab = await res.arrayBuffer();
                    const child = await renderPDF(ab, pdf);
                    pdf.appendChild(child);
                } else {
                    content = await res.text();
                }
            });
    });

    $: all = $documents?.find(({ id }) => id?.toString() === $page.params.integration)?.data?.all;
    $: file = all?.[$page.params.file];
</script>
<Wrapper title={file?.name || "File"}>
    <MainHeader slot="header">
        <Back href={`/${$page.params.integration}/folders/${encodeURIComponent($page.params.folder)}`} />
        <div class="sm:flex sm:items-center sm:justify-between space-y-2 sm:space-y-0">
            {#if file}
                <div>
                    <Text h1 class="break-words">{file?.name}</Text>
                    <Text secondary>{list([file?.date ? capitalize(formatDate(file.date)) : "", formatSize(file?.size), file?.owner || ""])}</Text>
                </div>
            {:else}
                <SkeletonGroup>
                    <Skeleton class="h-10 w-56" />
                </SkeletonGroup>
            {/if}
            <a class="flex w-full sm:w-max h-10 bg-highlight text-white items-center justify-center rounded-md hover:bg-highlight-light focus:bg-highlight-light active:bg-highlight-dark px-4" rel="noreferrer" download target="_blank" href={url}>
                <Text>Download</Text>
            </a>
        </div>
    </MainHeader>
    <DocumentParents document={file} />
    <div class="flex justify-center">
        <Card elevated class={cn("w-full", { "sm:w-max": ["application/pdf"].includes(type) })}>
            {#if type}
                {#if type.startsWith("image/")}
                    <img src={url} class="max-w-full" alt={file?.name} />
                {:else if type.startsWith("text/")}
                    <pre class="py-2 px-3">{content}</pre>
                {:else if type.startsWith("video/")}
                    <video controls src={url} class="max-w-full" />
                {:else if type.startsWith("audio/")}
                    <audio controls src={url} />
                {:else if type === "application/pdf"}
                    <div bind:this={pdf} class="w-full max-w-2xl space-y-4" />
                {:else}
                    <div class="flex items-center justify-center w-full h-64">
                        <Text>Unsupported file type and / or file too heavy</Text>
                    </div>
                {/if}
            {:else}
                <SkeletonGroup class="space-y-3 p-4 w-full">
                    <Skeleton class="h-8 w-40" />
                    <div class="space-y-2">
                        <Skeleton class="h-6 w-60" />
                        <Skeleton class="h-4 w-56" />
                        <Skeleton class="h-6 w-40" />
                    </div>
                </SkeletonGroup>
            {/if}
        </Card>
    </div>
</Wrapper>
