<script lang="ts">
    import { page } from "$app/stores";
    import { Back, Labelled, MainHeader, Switch, Text, Wrapper } from "$lib/components/ui";
    import { grades, period } from "$lib/stores";
    import { capitalize, formatDate, formatGrade, request } from "$lib/utils";
    import { onMount } from "svelte";

    onMount(() => {
        request("grades").then(g => grades.set(g));
    });

    $: integration = $grades?.find(({ id }) => id?.toString() === $page.params.integration);

    $: p = integration?.data?.periods?.[$period] || integration?.data?.periods?.[0];

    $: items = [
        {
            label: "Average",
            value: formatGrade(p?.value),
        },
        {
            label: "Class average",
            value: formatGrade(p?.average),
        },
        {
            label: "Minimum average",
            value: formatGrade(p?.min),
        },
        {
            label: "Maximum average",
            value: formatGrade(p?.max),
        },
        {
            label: "Beginning of the period",
            value: p?.start && capitalize(formatDate(p.start)),
        },
        {
            label: "End of the period",
            value: p?.end && capitalize(formatDate(p.end)),
        },
    ].filter(({ value }) => value)
</script>
<Wrapper title="Average">
    <MainHeader slot="header">
        <Back href="/grades" />
        <div class="sm:flex sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <Text h1>Average</Text>
            <Switch
                name="period"
                items={integration?.data?.periods?.map(({ name }, i) => ({ label: name, value: i })) || []}
                bind:value={$period}
            />
        </div>
        {#if p}
            <div class="grid gap-3 grid-cols-2 sm:grid-cols-4">
                {#each items as item}
                    <Labelled label={item.label}>
                        <Text>{item.value}</Text>
                    </Labelled>
                {/each}
            </div>
        {/if}
    </MainHeader>
</Wrapper>
