<script lang="ts">
    import { page } from "$app/stores";
    import { cn } from "$lib/utils";
</script>
<nav>
    <ul class="flex w-page overflow-x-auto h-10 px-2">
        {#each [
            { name: "Dashboard", path: "/" },
            { name: "Homeworks", path: "/homeworks" },
            { name: "Grades", path: "/grades", alts: ["[integration]/grades/[grade]", "[integration]/subjects/[subject]", "[integration]/average"] },
            { name: "Messages", path: "/messages" },
            { name: "Documents", path: "/documents" },
            { name: "Events", path: "/events" },
            { name: "Remarks", path: "/remarks" },
        ] as { name, path, alts } (path)}
            {@const active = $page.url.pathname === path || alts?.find(id => $page.route.id === `/(app)/${id}`)}
            <li class="h-full">
                <a class={cn(
                    active ? "text-label" : "text-tertiary-label hover:text-secondary-label active:text-label focus:text-secondary-label",
                    "px-2 h-full flex items-center justify-center relative",
                )} href={path}>
                    <p>{name}</p>
                    {#if active}
                        <div class="absolute bottom-0 w-full h-0.5 bg-label" />
                    {/if}
                </a>
            </li>
        {/each}
    </ul>
</nav>
