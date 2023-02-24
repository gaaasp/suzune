<script lang="ts">
    import { Separator, Text } from ".";

    type T = $$Generic<{ id: string | number }>;

    export let values: T[] | undefined;
    export let empty: string;
</script>
<div class="bg-base rounded-md border border-separator flex flex-col overflow-x-hidden">
    {#if values}
        {#each values as value, i (value.id)}
            {#if i !== 0}
                <Separator />
            {/if}
            <slot child={value}></slot>
        {:else}
            <div class="w-full h-32 flex items-center justify-center">
                <Text>{empty}</Text>
            </div>
        {/each}
    {/if}
</div>
