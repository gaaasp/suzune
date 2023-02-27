<script lang="ts">
    import { DocumentsList } from "$lib/components/documents";
    import { Text, Wrapper } from "$lib/components/ui";
    import { documents } from "$lib/stores";
</script>

<Wrapper title="Documents">
    {#if $documents}
        {#each $documents as integration}
            <div class="space-y-2">
                <Text h2>{integration.service.name} - {integration.user.name}</Text>
                {#each integration.data.homes as home}
                    {@const document = integration.data.all[home]}
                    <Text h3>{document.name}</Text>
                    <DocumentsList {document} all={integration.data.all} integration={integration.id} />
                {/each}
            </div>
        {/each}
    {/if}
</Wrapper>
