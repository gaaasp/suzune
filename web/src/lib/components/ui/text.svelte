<script lang="ts">
    import { cn } from "$lib/utils";

    export let h1 = false;
    export let h2 = false;
    export let h3 = false;
    export let secondary = false;
    export let tertiary = false;
    export let small = false;

    export let as: string = "";

    $: component = as || (
        h1 ? "h1" :
        h2 ? "h2" :
        "p"
    );

    $: className = cn({
        "text-4xl font-semibold": h1,
        "text-2xl font-semibold": h2,
        "text-xl font-semibold": h3,
        "text-secondary-label": secondary,
        "text-tertiary-label text-sm": tertiary,
        "text-sm": small,
    });
</script>

<svelte:element class={className} this={component}>
    <slot />
</svelte:element>
