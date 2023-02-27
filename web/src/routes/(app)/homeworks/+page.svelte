<script lang="ts">
    import { HomeworksList } from "$lib/components/homeworks";
    import { Link, MainHeader, Text, Wrapper } from "$lib/components/ui";
    import { homeworks } from "$lib/stores";
    import type { Homeworks } from "$lib/types";
    import { capitalize, formatDate } from "$lib/utils";

    $: homeworksByDate = $homeworks
        ?.filter(({ homework }) => new Date(homework.date).valueOf() > Date.now() - 24 * 60 * 60 * 1000)
        ?.reduce((dates, homework) => {
            const homeworkDate = homework?.homework?.date?.toString()?.split("T")?.[0];
            const sameDateHomeworks = dates.find(({ date }) => date === homeworkDate);
            if (sameDateHomeworks) {
                return [...dates.filter(({ date }) => date !== homeworkDate), { ...sameDateHomeworks, homeworks: [...sameDateHomeworks.homeworks, homework] }]
            } else {
                return [...dates, { date: homework.homework.date.toString().split("T")[0], homeworks: [homework] }]
            }
        }, [] as { date: string; homeworks: Homeworks }[])
        ?.sort((a, b) => new Date(a.date).valueOf() - new Date(b.date).valueOf())
</script>

<Wrapper title="Homeworks">
    <MainHeader slot="header">
        <div class="space-y-2 sm:space-y-0 sm:flex sm:items-center sm:justify-between">
            <Text h1>Homeworks</Text>
            <Link class="" href="/homeworks/history">View the history</Link>
        </div>
    </MainHeader>
    {#if homeworksByDate}
        {#each homeworksByDate as { date, homeworks }}
            <Text h2>{capitalize(formatDate(date))}</Text>
            <HomeworksList {homeworks} />
        {/each}
    {/if}
</Wrapper>
