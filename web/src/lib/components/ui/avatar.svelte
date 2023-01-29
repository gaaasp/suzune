<script lang="ts">
    export let url: string;
    export let username: string;
    export let as: "div" | "a" = "div";
    export let href: string = "";
</script>

<svelte:element this={as} class="rounded-full h-8 w-8 overflow-hidden" {...(href ? { href } : { })}>
    <img src={url || "/defaults/avatar.svg"} alt={`${username || "Nobody"}'s avatar`} />
</svelte:element>
