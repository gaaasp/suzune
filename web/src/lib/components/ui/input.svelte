<script lang="ts">
    import { Labelled } from ".";

    export let label: string = "";
    export let placeholder: string = "";
    export let type: "text" | "password" | "username" = "text";
    export let value: string | undefined = undefined;
    export let name: string | undefined = undefined;

    $: inputValues = {
        class: "bg-transparent h-full w-0 flex flex-1 px-3 focus:outline-none",
        placeholder: placeholder || label,
        name,
    }
</script>

<Labelled as="label" {label}>
    <div class="transition duration-200 h-10 bg-base border border-separator focus-within:border-opaque-separator flex rounded-md">
        {#if type === "password"}
            <input bind:value type="password" {...inputValues} />
        {:else if type === "username"}
            <input bind:value type="username" {...inputValues} />
        {:else}
            <input bind:value type="text" {...inputValues} />
        {/if}
    </div>
</Labelled>
