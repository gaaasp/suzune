<script lang="ts">
    import { Labelled } from ".";

    export let label: string = "";
    export let placeholder: string = "";
    export let value: string | undefined = undefined;
</script>

<Labelled as="label" {label}>
    <div class="transition duration-200 h-10 bg-base border border-separator focus-within:border-opaque-separator flex rounded-md">
        <input bind:value class="bg-transparent h-full w-0 flex flex-1 px-3 focus:outline-none" placeholder={placeholder || label} />
    </div>
</Labelled>
