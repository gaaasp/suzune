<script lang="ts">
    import { page } from "$app/stores";
    import { Back, Labelled, MainHeader, Text, Wrapper } from "$lib/components/ui";
    import { grades } from "$lib/stores";
    import { capitalize, formatDate, formatGrade, request } from "$lib/utils";
    import { onMount } from "svelte";

    onMount(() => {
        request("grades").then(g => grades.set(g));
    });

    $: integration = $grades?.find(({ id }) => id?.toString() === $page.params.integration);

    $: grade = integration?.data?.grades?.find(({ id }) => id?.toString() === $page.params.grade);

    $: period = integration?.data?.periods?.find(({ id }) => id === grade?.period);

    $: subject = period?.subjects?.find(({ id }) => id === grade?.subject);

    $: items = [
        {
            label: "Grade",
            value: grade?.value && formatGrade(grade.value, grade.denominator, integration?.data?.denominator),
        },
        {
            label: "Rank",
            value: grade?.rank && grade.rank.toString(),
        },
        {
            label: "Class average",
            value: typeof grade?.average === "number" && formatGrade(grade.average, grade.denominator, integration?.data?.denominator),
        },
        {
            label: "Minimum grade",
            value: typeof grade?.min === "number" && formatGrade(grade.min, grade.denominator, integration?.data?.denominator),
        },
        {
            label: "Maximum grade",
            value: typeof grade?.max === "number" && formatGrade(grade.max, grade.denominator, integration?.data?.denominator),
        },
        {
            label: "Subject",
            value: `${subject?.emoji} ${subject?.name}`,
            href: `/${integration?.id}/subjects/${subject?.id}`
        },
        {
            label: "Coefficient",
            value: formatGrade(grade?.coefficient),
        },
        {
            label: "Date",
            value: grade?.date && capitalize(formatDate(grade.date)),
        },
        {
            label: "Added",
            value: grade?.added && capitalize(formatDate(grade.added)),
        },
    ].filter(({ value }) => value)
</script>
<Wrapper title={grade?.name || "Grade"}>
    <MainHeader slot="header">
        <Back href="/grades" />
        <Text h1>{grade?.name}</Text>
        {#if grade}
            <div class="grid gap-3 grid-cols-2 sm:grid-cols-4">
                {#each items as item}
                    <Labelled label={item.label}>
                        {#if item.href}
                            <a href={item.href}>{item.value}</a>
                        {:else}
                            <Text>{item.value}</Text>
                        {/if}
                    </Labelled>
                {/each}
            </div>
        {/if}
    </MainHeader>
</Wrapper>
