<script lang="ts">
    import { Labelled } from ".";

    export let value: string;
    export let label: string = "";
</script>

<Labelled as="label" {label}>
    <select class="border border-separator bg-base rounded-md h-10 px-3 cursor-pointer" bind:value>
        <slot />
    </select>
</Labelled>
