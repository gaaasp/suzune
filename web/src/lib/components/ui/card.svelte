<script lang="ts">
    import { cn } from "$lib/utils";

    export let elevated = false;
    export let as = "div";
    let className = "";
    export { className as class };
</script>

<svelte:element this={as} class={cn("rounded-md border border-separator flex flex-col overflow-x-hidden", elevated ? "bg-elevated" : "bg-base", className)}>
    <slot />
</svelte:element>
