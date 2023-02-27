<script lang="ts">
    import { page } from "$app/stores";
    import { loadDocuments } from "$lib/load";
    import type { Document } from "$lib/types/documents";
    import { Link, Text } from "../ui";

    export let document: Document | undefined;
</script>

{#if document?.parents}
    <ul class="flex flex-wrap w-full">
        {#each document.parents as { id, name }}
            <li class="mr-2">
                <Link class="truncate" on:click={() => loadDocuments($page.params.integration, encodeURIComponent(id))} underline href={`/${$page.params.integration}/folders/${encodeURIComponent(id)}`}>
                    {name}
                </Link>
            </li>
            <Text class="mr-2 text-tertiary-label">/</Text>
        {/each}
        <li class="text-secondary-label truncate">{document?.name}</li>
    </ul>
{/if}
