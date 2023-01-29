<script lang="ts">
    import { Text } from ".";

    export let label: string;
    export let as: string = "div";
</script>

{#if label}
    <svelte:element this={as} class="space-y-0.5">
        <Text tertiary>{label}</Text>
        <slot />
    </svelte:element>
{:else}
    <slot />
{/if}
