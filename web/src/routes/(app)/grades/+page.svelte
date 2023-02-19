<script lang="ts">
    import { List, Select, Wrapper } from "$lib/components/ui";
    import { grades as g } from "$lib/stores";
    import type { Grades } from "$lib/types";
    import { request } from "$lib/utils";
    import { onMount } from "svelte";

    let grades: Grades = [];
    g.subscribe(value => {
        grades = value;
    });

    let integration = "0";
    $: i = grades?.[parseInt(integration)];
    $: periods = i?.data?.periods;
    let p = 0;
    $: period = periods?.[p];

    onMount(() => {
        request("grades").then(i => g.set(i));
    });

</script>
<Wrapper title="Grades">
    <Select bind:value={integration}>
        {#each grades as integration, i}
            <option value={i?.toString()}>{integration.service.name} - {integration.user.name}</option>
        {/each}
    </Select>
    {periods?.[0]?.value}
    <List empty="No subjects" let:child={subject} values={period?.subjects}>
        <div>
            <p>{subject.emoji}</p>
            <ul>
                {#each subject.grades as grade}
                    <li>
                        <a>
                            {grade.value}
                        </a>
                    </li>
                {/each}
            </ul>
        </div>
    </List>
</Wrapper>
