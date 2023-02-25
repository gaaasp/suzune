<script lang="ts">
    import { cn } from "$lib/utils";

    let className = "";
    export { className as class };
</script>

<div class={cn(
    "animate-pulse",
    className,
)}>
    <slot />
</div>
