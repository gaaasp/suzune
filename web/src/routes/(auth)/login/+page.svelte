<script>

    import { supabase } from "$lib/supabase";

</script>
<div>
    <button on:click={async () => {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider: "github",
        });
        console.log(data, error);
    }}>Continue with GitHub</button>
</div>
