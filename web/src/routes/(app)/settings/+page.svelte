<script lang="ts">
    import { Button, Input, Select, Separator, Text, Wrapper } from "$lib/components/ui";

    let service = "ecoledirecte";
    let value: { [key: string]: any } = {};

    $: {
        service;
        value = {};
    };
    
    $: valid = value && (service === "ecoledirecte" && value.username && value.password)

    function addService() {
        console.log(service, value);
    }
</script>

<Wrapper title="Settings">
    <Text h2>Integrations</Text>
    <section class="bg-elevated rounded-md border border-separator px-4 py-2 space-y-3">
        <header>
            <Text h3>Add new</Text>
        </header>
        <Separator />
        <main class="flex flex-col space-y-2">
            <div>
                <Select label="Service" bind:value={service}>
                    <option value="pronote">Pronote</option>
                    <option value="ecoledirecte">EcoleDirecte</option>
                </Select>
            </div>
            {#if service == "ecoledirecte"}
                <Input label="Username" bind:value={value.username} />
                <Input label="Password" bind:value={value.password} />
            {/if}
        </main>
        <Separator />
        <footer class="flex items-center justify-between">
            <Text tertiary>New services are often added</Text>
            <Button disabled={!valid} on:click={addService}>Add</Button>
        </footer>
    </section>
</Wrapper>
