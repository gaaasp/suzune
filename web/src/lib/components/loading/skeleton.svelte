<script lang="ts">
    import { cn } from "$lib/utils";

    export let rounded = false;
    let className = "";
    export { className as class };
</script>

<div class={cn(
    "bg-separator",
    rounded ? "rounded-full" : "rounded-md",
    className,
)} />
