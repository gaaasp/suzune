<script lang="ts">
    import { cn } from "$lib/utils";

    export let disabled = false;
    export let as: "button" | "label" = "button";
    let className = "";
    export { className as class };
</script>

<svelte:element this={as}
    {disabled}
    on:click
    class={cn(
        "h-10 px-3 rounded-md border transition duration-200 flex items-center justify-center",
        disabled ? "cursor-not-allowed border-separator bg-accent text-tertiary-label" : "cursor-pointer text-white bg-highlight border-highlight hover:bg-highlight-light active:bg-highlight-dark hover:border-highlight-light active:border-highlight-dark",
        className,
    )}
>
    <slot />
</svelte:element>
