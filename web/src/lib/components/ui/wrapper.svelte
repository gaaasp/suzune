<script lang="ts">
    export let title: string;
</script>

<svelte:head>
    <title>{title} - Suzune</title>
</svelte:head>
<main class="w-page px-page py-2 space-y-4">
    <slot />
</main>
