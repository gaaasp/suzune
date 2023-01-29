<script lang="ts">
    import { page } from "$app/stores";
    import { Avatar, Logo, Nav } from "./index";
</script>

<header class="border-b border-separator">
    <main class="w-page px-2 flex items-center justify-between py-1">
        <Logo />
        <Avatar url={$page.data.session?.user?.user_metadata?.avatar_url} href="/settings" as="a" username={$page.data.session?.user?.user_metadata?.user_name} />
    </main>
    <Nav />
</header>
