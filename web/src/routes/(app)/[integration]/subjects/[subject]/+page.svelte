<script lang="ts">
    import { page } from "$app/stores";
    import { GradeValue } from "$lib/components/grades";
    import { Back, Emoji, Labelled, List, MainHeader, Switch, Text, Wrapper } from "$lib/components/ui";
    import { grades, period } from "$lib/stores";
    import { capitalize, formatDate, formatGrade, list, request } from "$lib/utils";
    import { onMount } from "svelte";

    onMount(() => {
        request("grades").then(g => grades.set(g));
    });

    $: integration = $grades?.find(({ id }) => id?.toString() === $page.params.integration);

    $: periods = integration?.data?.periods?.filter(({ subjects }) => subjects.find(({ id }) => id?.toString() === $page.params.subject));
    $: subject = (periods?.[$period] || periods?.[0])?.subjects?.find(({ id }) => id?.toString() === $page.params.subject);

    $: items = [
        {
            label: "Average",
            value: formatGrade(subject?.value),
        },
        {
            label: "Class average",
            value: formatGrade(subject?.average),
        },
        {
            label: "Minimum average",
            value: formatGrade(subject?.min),
        },
        {
            label: "Maximum average",
            value: formatGrade(subject?.max),
        },
        {
            label: "Teachers",
            value: list(subject?.teachers?.map(({ name }) => name) || []),
        },
        {
            label: "Coefficient",
            value: formatGrade(subject?.coefficient),
        },
    ].filter(({ value }) => value)
</script>
<Wrapper title={subject?.name || "Grade"}>
    <MainHeader slot="header">
        <Back href="/grades" />
        <div class="sm:flex sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <Text h1>{subject?.emoji} {subject?.name}</Text>
            <Switch
                name="period"
                items={periods?.map(({ name }, i) => ({ label: name, value: i })) || []}
                bind:value={$period}
            />
        </div>
        {#if subject}
            <div class="grid gap-3 grid-cols-2 sm:grid-cols-4">
                {#each items as item}
                    <Labelled label={item.label}>
                        <Text>{item.value}</Text>
                    </Labelled>
                {/each}
            </div>
        {/if}
    </MainHeader>
    <List let:child={grade} values={subject?.grades} empty="No grade">
        <a href={`/${integration?.id}/grades/${grade.id}`} class="flex hover:bg-elevated">
            <Emoji>{subject?.emoji}</Emoji>
            <div class="py-1 flex items-center justify-between flex-1 mr-2">
                <div>
                    <Text>{grade.name}</Text>
                    {#if grade.date}
                        <Text tertiary>{capitalize(formatDate(grade.date))}</Text>
                    {/if}
                </div>
                <GradeValue grade={grade} denominator={integration?.data?.denominator || 20} />
            </div>
        </a>
    </List>
</Wrapper>
