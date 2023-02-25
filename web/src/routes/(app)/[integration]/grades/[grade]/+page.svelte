<script lang="ts">
    import { page } from "$app/stores";
    import { Skeleton, SkeletonGroup } from "$lib/components/loading";
    import { Back, Information, MainHeader, Text, Wrapper } from "$lib/components/ui";
    import { loadGrades } from "$lib/load";
    import { grades, period as p, integration as i } from "$lib/stores";
    import { capitalize, formatDate, formatGrade } from "$lib/utils";
    import { onMount } from "svelte";

    onMount(() => {
        loadGrades($p, $i);
    });

    $: integration = $grades?.find(({ id }) => id?.toString() === $page.params.integration);
    $: grade = integration?.data?.grades?.find(({ id }) => id?.toString() === $page.params.grade);
    $: period = integration?.data?.periods?.find(({ id }) => id === grade?.period);
    $: subject = period?.subjects?.find(({ id }) => id === grade?.subject);

    $: items = [
        {
            label: "Grade",
            value: formatGrade(grade?.value, grade?.denominator, integration?.data?.denominator),
        },
        {
            label: "Rank",
            value: grade?.rank ? grade.rank.toString() : undefined,
        },
        {
            label: "Class average",
            value: typeof grade?.average === "number" ? formatGrade(grade.average, grade.denominator, integration?.data?.denominator) : undefined,
        },
        {
            label: "Minimum grade",
            value: typeof grade?.min === "number" ? formatGrade(grade.min, grade.denominator, integration?.data?.denominator) : undefined,
        },
        {
            label: "Maximum grade",
            value: typeof grade?.max === "number" ? formatGrade(grade.max, grade.denominator, integration?.data?.denominator) : undefined,
        },
        {
            label: "Subject",
            value: subject?.name && `${subject?.emoji} ${subject?.name}`,
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
    ];
</script>
<Wrapper title={grade?.name || "Grade"}>
    <MainHeader slot="header">
        <Back href="/grades" />
        {#if grade}
            <Text h1>{grade?.name}</Text>
        {:else}
            <SkeletonGroup>
                <Skeleton class="h-10 w-48" />
            </SkeletonGroup>
        {/if}
        <Information {items} />
    </MainHeader>
</Wrapper>
