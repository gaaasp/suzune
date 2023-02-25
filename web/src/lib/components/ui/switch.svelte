<script lang="ts">
    import { Text } from ".";
    import { cn } from "$lib/utils";
    import { Skeleton, SkeletonGroup } from "../loading";

    export let name: string;
    export let items: { label: string; value: string | number }[] | undefined;
    export let value: string | number;
</script>
<div class="border border-separator rounded-md flex h-10 bg-elevated">
    {#if Array.isArray(items)}
        {#each items as item}
            <label class="flex cursor-pointer p-1" style={`width: ${100 / items.length}%`}>
                <div class={cn(item.value === value ? "bg-separator" : "text-secondary-label", "rounded flex items-center justify-center w-full")}>
                    <Text class="truncate px-1 max-w-full">{item.label}</Text>
                </div>
                <input type="radio" name={name} value={item.value} bind:group={value} class="hidden" />
            </label>
        {/each}
    {:else}
        <SkeletonGroup>
            <Skeleton class="h-10 w-full sm:w-48" />
        </SkeletonGroup>
    {/if}
</div>
