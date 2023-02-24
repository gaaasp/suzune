<script lang="ts">
    import type { Grade } from "$lib/types/grades";
    import { formatGrade } from "$lib/utils";
    import { Text } from "../ui";

    export let grade: Grade;
    export let denominator: number;
    export let secondary = false;
</script>

<Text {secondary}>
    {formatGrade(grade?.value)}
    {#if grade?.denominator && grade?.denominator !== denominator}
        <sub class="-ml-1">/ {formatGrade(grade?.denominator)}</sub>
    {/if}
    {#if grade?.coefficient !== 1}
        <sup class="-ml-0.5">{formatGrade(grade?.coefficient)}</sup>
    {/if}
</Text>
