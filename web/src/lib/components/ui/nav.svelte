<script lang="ts">
    import { page } from "$app/stores";
    import { cn } from "$lib/utils";
</script>
<nav>
    <ul class="flex w-page overflow-x-auto">
        {#each [
            { name: "Dashboard", path: "/" },
            { name: "Homeworks", path: "/homeworks" },
            { name: "Grades", path: "/grades" },
            { name: "Messages", path: "/messages" },
            { name: "Documents", path: "/documents" },
            { name: "Events", path: "/events" },
            { name: "Remarks", path: "/remarks" },
        ] as { name, path } (path)}
        <li><a class={cn(
            $page.url.pathname === path ? "text-label" : "text-tertiary-label hover:text-secondary-label active:text-label focus:text-secondary-label",
            "px-2",
        )} href={path}>{name}</a></li>
        {/each}
    </ul>
</nav>
