<script lang="ts">
    import { goto } from "$app/navigation";
    import { onMount } from "svelte";


    export let title: string;

    onMount(() => {
        if (!document.cookie.split("; ").find(cookie => cookie.startsWith(("supabase-auth-token")))) {
            goto("/login");
        }
    })
</script>

<svelte:head>
    <title>{title} - Suzune</title>
</svelte:head>
<slot name="header" />
<main class="w-page px-page py-4 space-y-4">
    <slot />
</main>
