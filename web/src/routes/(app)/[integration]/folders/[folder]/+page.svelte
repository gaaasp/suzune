<script lang="ts">
    import { page } from "$app/stores";
    import { DocumentParents, DocumentsList } from "$lib/components/documents";
    import { Skeleton, SkeletonGroup } from "$lib/components/loading";
    import { Back, MainHeader, Text, Wrapper } from "$lib/components/ui";
    import { loadDocuments } from "$lib/load";
    import { documents } from "$lib/stores";
    import { capitalize, formatDate, formatSize, list } from "$lib/utils";
    import { onMount } from "svelte";

    onMount(() => loadDocuments($page.params.integration, $page.params.folder));

    $: all = $documents?.find(({ id }) => id?.toString() === $page.params.integration)?.data?.all;
    $: folder = all?.[$page.params.folder];
</script>

<Wrapper title={folder?.name || "Folder"}>
    <MainHeader slot="header">
        <Back href={folder?.parents?.length ? `/${$page.params.integration}/folders/${encodeURIComponent(folder?.parents[folder.parents.length - 1]?.id)}` : "/documents"} />
        {#if folder}
            <div>
                <Text h1>{folder?.name}</Text>
                <Text secondary>{list([folder.date ? capitalize(formatDate(folder.date)) : "", formatSize(folder.size)])}</Text>
            </div>
        {:else}
            <SkeletonGroup>
                <Skeleton class="h-10 w-56" />
            </SkeletonGroup>
        {/if}
    </MainHeader>
    <DocumentParents document={folder} />
    <DocumentsList click={(document) => document.kind === "folder" && loadDocuments($page.params.integration, encodeURIComponent(document.id))} document={folder} all={all || {}} integration={$page.params.integration} />
</Wrapper>
