<script lang="ts">
    import {  Subject } from "$lib/components/grades";
    import { Skeleton, SkeletonGroup } from "$lib/components/loading";
    import { Labelled, List, MainHeader, Select, Switch, Text, Wrapper } from "$lib/components/ui";
    import { loadGrades } from "$lib/load";
    import { grades, integration, period } from "$lib/stores";
    import { formatGrade } from "$lib/utils";
    import { onMount } from "svelte";

    $: i = $grades?.[$integration];
    $: periods = i?.data?.periods;
    $: p = periods?.[$period || 0];

    onMount(() => {
        loadGrades($period, $integration, $grades);
    });

</script>
<Wrapper title="Grades">
    <MainHeader slot="header">
        <div class="space-y-4 sm:space-y-0 sm:flex sm:space-x-4 sm:items-center sm:justify-between">
            <Select bind:value={$integration} loading={!$grades} class="w-full sm:w-max">
                {#each $grades as integration, i}
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
                {#if p}
                    <Text large class="!-mt-1">{formatGrade(p?.value)}</Text>
                {:else}
                    <SkeletonGroup>
                        <Skeleton class="h-6 w-16" />
                    </SkeletonGroup>
                {/if}
            </Labelled>
        </a>
    </MainHeader>
    <List elevated empty="No subjects" let:child={subject} values={p?.subjects}>
        <Subject {subject} denominator={i?.data?.denominator} subjectHref={`/${i?.id}/subjects/${subject.id}`} gradeHref={({ id }) => `${i?.id}/grades/${id}`} />
    </List>
</Wrapper>
