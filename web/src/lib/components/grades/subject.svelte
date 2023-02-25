<script lang="ts">
    import type { Grade, Subject } from "$lib/types/grades";
    import { formatGrade, list, cn } from "$lib/utils";
    import { GradeValue } from ".";
    import { Emoji, Text } from "../ui";

    export let subject: Subject;
    export let denominator = 20;
    export let subjectHref: string;
    export let gradeHref: (grade: Grade) => string;
</script>

<div class="flex">
    <Emoji>{subject.emoji}</Emoji>
    <div class="py-1 space-y-1 flex flex-col flex-1 mr-2">
        <a title={list([
            typeof subject.average === "number" ? `Class ${formatGrade(subject.average)}` : "",
            typeof subject.min === "number" ? `Min ${formatGrade(subject.min)}` : "",
            typeof subject.max === "number" ? `Max ${formatGrade(subject.max)}` : ""
        ])} href={subjectHref} class="flex items-center justify-between w-full">
            <div>
                <Text large>{subject.name}</Text>
                <Text tertiary>{list(subject.teachers.map(({ name }) => name))}</Text>
            </div>
            <Text large>{formatGrade(subject.value)}</Text>
        </a>
        <ul class="flex">
            {#each subject.grades as grade, index}
                <li class={cn(index !== subject.grades.length - 1 ? "mr-1.5" : "")}>
                    <a title={list([
                        grade.name,
                        typeof grade.average === "number" ? `Class ${formatGrade(grade.average, grade.denominator, denominator)}` : "",
                        typeof grade.min === "number" ? `Min ${formatGrade(grade.min, grade.denominator, denominator)}` : "",
                        typeof grade.max === "number" ? `Max ${formatGrade(grade.max, grade.denominator, denominator)}` : ""
                    ])} href={gradeHref(grade)} class="flex text-tertiary-label hover:text-secondary-label focus:text-secondary-label active:text-label">
                        <GradeValue grade={grade} {denominator} />
                    </a>
                </li>
            {/each}
        </ul>
    </div>
</div>
