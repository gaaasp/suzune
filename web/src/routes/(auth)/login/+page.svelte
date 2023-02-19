<script>
    import { supabase } from "$lib/supabase";
</script>
<div>
    <button on:click={async () => {
        const { data } = await supabase.auth.signInWithOAuth({
            provider: "github",
        });
        console.log(data);
    }}>Continue with GitHub</button>
</div>
