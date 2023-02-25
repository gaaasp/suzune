<script lang="ts">
    import type { Grade, Subject } from "$lib/types/grades";
    import { capitalize, formatDate } from "$lib/utils";
    import { GradeValue } from ".";
    import { Emoji, Text } from "../ui";

    export let subject: Subject;
    export let grade: Grade;
    export let href: string;
    export let denominator: number | undefined;
</script>

<a href={href} class="flex hover:bg-elevated">
    <Emoji>{subject?.emoji}</Emoji>
    <div class="py-1 flex items-center justify-between flex-1 mr-2">
        <div>
            <Text>{grade.name}</Text>
            {#if grade.date}
                <Text tertiary>{capitalize(formatDate(grade.date))}</Text>
            {/if}
        </div>
        <GradeValue {grade} {denominator} />
    </div>
</a>
