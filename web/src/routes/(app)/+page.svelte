<script lang="ts">
    import { Emoji, List, Text, Wrapper } from "$lib/components/ui";
    import { homeworks } from "$lib/stores";
    import type { Homework } from "$lib/types/homeworks";
    import { capitalize, formatDate, list, request } from "$lib/utils";
    import { onMount } from "svelte";

    onMount(() => {
        request("homeworks").then(i => homeworks.set(i));
    });

    let defaultHomeworks: Homework[] = [];

    $: homeworksList = $homeworks?.reduce((homeworks, integration) => ([...homeworks, ...integration.data]), defaultHomeworks)
</script>
<Wrapper title="Dashboard">
    {#if homeworksList?.length}
        <List let:child={homework} empty="Aucun devoir" values={homeworksList}>
            <div class="flex">
                <Emoji>{homework.subject.emoji}</Emoji>
                <div class="py-1">
                    <Text>{homework.subject.name}</Text>
                    <Text tertiary>{list([capitalize(formatDate(homework.date)), homework.options.exam ? "Exam" : "", homework.options.uploadable ? "To be returned" : ""])}</Text>
                </div>
            </div>
        </List>
    {/if}
</Wrapper>
