<script lang="ts">
    import { Wrapper } from "$lib/components/ui";
    import { homeworks as h } from "$lib/stores";
import { request } from "$lib/utils";
    import { onMount } from "svelte";

    let homeworks: any[] = [];
    h.subscribe(value => {
        homeworks = value;
    });

    onMount(() => {
        request("homeworks").then(i => h.set(i));
    });
</script>
<Wrapper title="Dashboard">
    {JSON.stringify(homeworks)}
</Wrapper>
