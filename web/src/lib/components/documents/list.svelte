<script lang="ts">
    import type { Document } from "$lib/types/documents";
    import { capitalize, formatDate, formatSize, list } from "$lib/utils";
    import { Emoji, List, Text } from "../ui";


    export let document: Document | undefined;
    export let all: { [key: string]: Document }
    export let integration: string | number;
    export let click = (_d: Document) => {};
</script>

<List values={document?.children?.map(d => all[d])} empty="Dossier vide" let:child={d}>
    <a on:click={() => click(d)} target={d.kind === "url" ? "_blank" : undefined} href={d.kind === "url" ? d.content : d.kind === "folder" ? `/${integration}/folders/${encodeURIComponent(d.id)}` : `/${integration}/folders/${encodeURIComponent(document?.id || "")}/${encodeURIComponent(d.id)}`} class="flex hover:bg-elevated focus:bg-elevated">
        <Emoji>
            {#if d.kind === "folder"}
                📁
            {:else if d.kind === "url"}
                🔗
            {:else}
                📄
            {/if}
        </Emoji>
        <div class="py-1">
            <Text>{d.name}</Text>
            <Text tertiary>{list([d.description || "", d.date && capitalize(formatDate(d.date)) || "", d.size ? formatSize(d.size) : "", d.owner || ""])}</Text>
        </div>
    </a>
</List>
