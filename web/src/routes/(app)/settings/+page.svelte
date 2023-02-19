<script lang="ts">
    import { Button, Input, List, Select, Separator, Text, Wrapper } from "$lib/components/ui";
    import { integrations } from "$lib/stores";
    import { request } from "$lib/utils";
    import { onMount } from "svelte";

    let service = "ecoledirecte";
    let params: { [key: string]: any } = {};
    let loading = false;

    $: {
        service;
        params = {};
    };
    
    $: valid = params && (service === "ecoledirecte" && params.username && params.password);

    let i: any[] = [];
    integrations.subscribe(value => {
        i = value;
    });

    onMount(() => {
        request("integrations").then(i => integrations.set(i));
    });

    async function addService() {
        loading = true;
        return request("integrations", { method: "POST", data: { service, params } })
            .then(() => request("integrations").then(i => {
                integrations.set(i);
                loading = false;
            }));
    }
</script>

<Wrapper title="Settings">
    <Text h2>Integrations</Text>
    <form class="bg-elevated rounded-md border border-separator px-4 py-2 space-y-3">
        <header>
            <Text h3>Add new</Text>
        </header>
        <Separator />
        <main class="flex flex-col space-y-2">
            <div>
                <Select label="Service" bind:value={service}>
                    <option value="ecoledirecte">EcoleDirecte</option>
                </Select>
            </div>
            {#if service == "ecoledirecte"}
                <Input label="Username" name="username" bind:value={params.username} />
                <Input label="Password" name="password" bind:value={params.password} />
            {/if}
        </main>
        <Separator />
        <footer class="flex items-center justify-between">
            <Text tertiary>New services are often added</Text>
            <Button disabled={!valid || loading} on:click={addService}>Add</Button>
        </footer>
    </form>
    <List empty="No integration added" values={i} let:child={integration}>
        <div class="px-4 py-3 flex items-center space-x-4">
            <img class="h-8 w-8 rounded-full border border-separator" alt={`${integration.service.name}'s logo`} src={`/logos/${integration.service.id}.png`} />
            <div class="flex flex-col">
                <Text large>{integration.service.name}</Text>
                {#if integration.user}
                    <Text tertiary>{integration.user.name}</Text>
                {:else}
                    <Text>The user couldn't be loaded</Text>
                {/if}
            </div>
        </div>
    </List>
</Wrapper>
