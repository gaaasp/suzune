<script lang="ts">
    import { GradeValue } from "$lib/components/grades";
    import { Emoji, Labelled, List, MainHeader, Select, Switch, Text, Wrapper } from "$lib/components/ui";
    import { grades as g, integration, period } from "$lib/stores";
    import type { Grades } from "$lib/types";
    import { cn, formatGrade, list, request } from "$lib/utils";
    import { onMount } from "svelte";

    let grades: Grades = [];
    g.subscribe(value => {
        grades = value;
    });

    $: i = grades?.[$integration];
    $: periods = i?.data?.periods;
    $: p = periods?.[$period];

    onMount(() => {
        request("grades").then(i => g.set(i));
    });

</script>
<Wrapper title="Grades">
    <MainHeader slot="header">
        <div class="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 sm:items-center sm:justify-between">
            <Select bind:value={$integration} class="w-full sm:w-max">
                {#each grades as integration, i}
                    <option value={i}>{integration.service.name} - {integration.user.name}</option>
                {/each}
            </Select>
            <Switch
                name="period"
                items={periods?.map(({ name }, i) => ({ label: name, value: i }))}
                bind:value={$period}
            />
        </div>
        <a class="w-full flex" href={`/${i?.id}/average`}>
            <Labelled label="Average">
                <Text large class="!-mt-1">{formatGrade(p?.value)}</Text>
            </Labelled>
        </a>
    </MainHeader>
    <List empty="No subjects" let:child={subject} values={p?.subjects}>
        <div class="flex">
            <Emoji>{subject.emoji}</Emoji>
            <div class="py-1 space-y-1 flex flex-col flex-1 mr-2">
                <a href={`/${i?.id}/subjects/${subject?.id}`} class="flex items-center justify-between w-full">
                    <div>
                        <Text large>{subject.name}</Text>
                        <Text tertiary>{list(subject.teachers.map(({ name }) => name))}</Text>
                    </div>
                    <Text large>{formatGrade(subject.value)}</Text>
                </a>
                <ul class="flex">
                    {#each subject.grades as grade, index}
                        <li class={cn(index !== subject.grades.length - 1 ? "mr-1.5" : "")}>
                            <a href={`/${i?.id}/grades/${grade.id}`} class="flex">
                                <GradeValue secondary grade={grade} denominator={i?.data?.denominator || 20} />
                            </a>
                        </li>
                    {/each}
                </ul>
            </div>
        </div>
    </List>
</Wrapper>
