<script lang="ts">
    import { Labelled } from ".";
    import { cn } from "$lib/utils";
    import { Skeleton, SkeletonGroup } from "../loading";

    export let value: string | number;
    export let label: string = "";
    export let loading = false;

    let className: string = "";
    export { className as class };
</script>

<Labelled as="label" {label}>
    {#if loading}
        <SkeletonGroup>
            <Skeleton class="h-10 w-full sm:w-48" />
        </SkeletonGroup>
    {:else}
    <select class={cn("border border-separator bg-base rounded-md h-10 px-3 cursor-pointer", className)} bind:value>
        <slot />
    </select>
    {/if}
</Labelled>
