<script lang="ts">
    import { Labelled } from ".";
    import { cn } from "$lib/utils";

    export let value: string | number;
    export let label: string = "";

    let className: string = "";
    export { className as class };
</script>

<Labelled as="label" {label}>
    <select class={cn("border border-separator bg-base rounded-md h-10 px-3 cursor-pointer", className)} bind:value>
        <slot />
    </select>
</Labelled>
