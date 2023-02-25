<script lang="ts">
    import { page } from "$app/stores";
    import { GradeItem, GradeValue } from "$lib/components/grades";
    import { Skeleton, SkeletonGroup } from "$lib/components/loading";
    import { Back, Emoji, Information, List, MainHeader, Switch, Text, Wrapper } from "$lib/components/ui";
    import { loadGrades } from "$lib/load";
    import { grades, period, integration as i } from "$lib/stores";
    import { capitalize, formatDate, formatGrade, list } from "$lib/utils";
    import { onMount } from "svelte";

    onMount(() => {
        loadGrades($period, $i);
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
            value: typeof subject?.average === "number" ? formatGrade(subject?.average) : "",
        },
        {
            label: "Minimum average",
            value: typeof subject?.min === "number" ? formatGrade(subject?.min) : "",
        },
        {
            label: "Maximum average",
            value: typeof subject?.max === "number" ? formatGrade(subject?.max) : "",
        },
        {
            label: "Teachers",
            value: list(subject?.teachers?.map(({ name }) => name) || []),
        },
        {
            label: "Coefficient",
            value: formatGrade(subject?.coefficient),
        },
    ];
</script>
<Wrapper title={subject?.name || "Grade"}>
    <MainHeader slot="header">
        <Back href="/grades" />
        <div class="sm:flex sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            {#if subject}
                <Text h1>{subject?.emoji} {subject?.name}</Text>
            {:else}
                <SkeletonGroup>
                    <Skeleton class="h-10 w-48" />
                </SkeletonGroup>
            {/if}
            <Switch
                name="period"
                items={periods?.map(({ name }, i) => ({ label: name, value: i }))}
                bind:value={$period}
            />
        </div>
        <Information {items} />
    </MainHeader>
    {#if subject}
        <List let:child={grade} values={subject?.grades} empty="No grade">
            <GradeItem href={`/${integration?.id}/grades/${grade.id}`} {grade} {subject} denominator={integration?.data?.denominator} />
        </List>
    {/if}
</Wrapper>
