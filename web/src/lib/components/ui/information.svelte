<script lang="ts">
    import { Labelled, Link, Text } from ".";

    export let items: {
        label: string;
        value: string | undefined;
        href?: string;
    }[];
</script>

<div class="grid gap-3 grid-cols-2 sm:grid-cols-4">
    {#each (items || []).filter(({ value }) => value) as item}
        <Labelled label={item.label}>
            {#if item.href}
                <Link class="hover:underline focus:underline" href={item.href}>{item.value}</Link>
            {:else}
                <Text>{item.value}</Text>
            {/if}
        </Labelled>
    {/each}
</div>
