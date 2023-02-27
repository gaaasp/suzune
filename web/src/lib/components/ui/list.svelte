<script lang="ts">
    import { Card, Separator, Text } from ".";
    import { Skeleton, SkeletonGroup } from "../loading";

    type T = $$Generic;

    export let values: T[] | undefined;
    export let empty: string;
    export let elevated = false;
</script>
<Card {elevated}>
    {#if values}
        {#each values as value, i}
            {#if i !== 0}
                <Separator />
            {/if}
            <slot child={value}></slot>
        {:else}
            <div class="w-full h-32 flex items-center justify-center">
                <Text>{empty}</Text>
            </div>
        {/each}
    {:else}
        <SkeletonGroup class="space-y-4 px-4 py-3">
            <div class="space-y-2">
                <Skeleton class="h-6 w-40" />
                <Skeleton class="h-4 w-28" />
            </div>
            <div class="space-y-2">
                <Skeleton class="h-6 w-48" />
                <Skeleton class="h-4 w-32" />
            </div>
            <div class="space-y-2">
                <Skeleton class="h-6 w-32" />
                <Skeleton class="h-4 w-24" />
            </div>
        </SkeletonGroup>
    {/if}
</Card>
