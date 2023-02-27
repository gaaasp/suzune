<script lang="ts">
    import { page } from "$app/stores";
    import { GradeItem } from "$lib/components/grades";
    import { Back, Card, Information, Link, List, MainHeader, Switch, Text, Wrapper } from "$lib/components/ui";
    import { loadGrades } from "$lib/load";
    import { grades, period, integration as i } from "$lib/stores";
    import { capitalize, formatDate, formatGrade, cn, list } from "$lib/utils";
    import { onMount } from "svelte";

    onMount(() => {
        loadGrades($period, $i, $grades);
    });

    $: integration = $grades?.find(({ id }) => id?.toString() === $page.params.integration);

    $: p = integration?.data?.periods?.[$period] || integration?.data?.periods?.[0];

    let s: number | string = 0;
    $: subject = p?.subjects?.find(({ id }) => id === s);

    $: items = [
        {
            label: "Average",
            value: formatGrade(p?.value),
        },
        {
            label: "Class average",
            value: typeof p?.average === "number" ? formatGrade(p?.average) : "",
        },
        {
            label: "Minimum average",
            value: typeof p?.min === "number" ? formatGrade(p?.min) : "",
        },
        {
            label: "Maximum average",
            value: typeof p?.max === "number" ? formatGrade(p?.max) : "",
        },
        {
            label: "Beginning of the period",
            value: p?.start && capitalize(formatDate(p.start)),
        },
        {
            label: "End of the period",
            value: p?.end && capitalize(formatDate(p.end)),
        },
    ];
</script>
<Wrapper title="Average">
    <MainHeader slot="header">
        <Back href="/grades" />
        <div class="sm:flex sm:items-center sm:justify-between space-y-4 sm:space-y-0">
            <Text h1>Average</Text>
            <Switch
                name="period"
                items={integration?.data?.periods?.map(({ name }, i) => ({ label: name, value: i }))}
                bind:value={$period}
            />
        </div>
        <Information {items} />
    </MainHeader>
    {#if p}
        <Text h2>Graph</Text>
        <Card class="p-2 sm:p-3 h-80">
            <div class="grid gap-2 sm:gap-3 flex-1" style={`grid-template-columns: repeat(${p?.subjects?.length || 8}, minmax(0px, 1fr))`}>
                {#each p.subjects as subject}
                    <button on:click={() => {
                        if (s === subject.id) {
                            s = 0;
                        } else {
                            s = subject.id;
                        }
                    }} class="h-full relative">
                        <div
                            style={`top: ${integration?.data?.denominator && subject?.max ? (integration.data.denominator - subject.max) / integration.data.denominator * 100 : "0"}%; height: ${integration?.data?.denominator && subject?.max && typeof subject?.min === "number" ? (subject.max - subject.min) / integration.data.denominator * 100 : "100"}%;`}
                            class={cn("absolute left-0 w-full border rounded-md flex items-center justify-center", s === subject.id ? "bg-highlight-light border-highlight-light" : "bg-elevated border-separator")}
                        >
                            <Text class="z-10">{subject.emoji}</Text>
                        </div>
                        {#if typeof subject.value === "number" && integration?.data?.denominator}
                            <div class="h-0.5 w-full absolute left-0 bg-red" style={`top: ${(integration.data.denominator - subject.value) / integration.data.denominator * 100}%`} />
                        {/if}
                        {#if typeof subject.average === "number" && integration?.data?.denominator}
                            <div class="h-0.5 w-full absolute left-0 bg-highlight" style={`top: ${(integration.data.denominator - subject.average) / integration.data.denominator * 100}%`} />
                        {/if}
                    </button>
                {/each}
            </div>
        </Card>
    {/if}
    {#if subject}
        <div class="space-y-2">
            <Link underline href={`/${integration?.id}/subjects/${subject.id}`}>
                <Text h2>{subject.emoji} {subject.name}</Text>
            </Link>
            <Card class="px-3 py-2">
                <Information items={[
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
                ]} />
            </Card>
        </div>
        <div class="space-y-2">
            <Text h2>Grades</Text>
            <List let:child={grade} values={subject?.grades} empty="No grade">
                <GradeItem href={`/${integration?.id}/grades/${grade.id}`} {grade} {subject} denominator={integration?.data?.denominator} />
            </List>
        </div>
    {/if}
</Wrapper>
