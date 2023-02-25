<script lang="ts">
    import { cn } from "$lib/utils";

    export let href: string;
    export let highlight: boolean = false;
    export let underline: boolean = false;
    let className: string = "";
    export { className as class };
</script>
<a {href} class={cn({
    "text-highlight hover:text-highlight-light focus:text-highlight-light active:text-highlight-dark": highlight,
    "hover:underline focus:underline": highlight || underline,
}, className)}>
    <slot />
</a>
