<script>
    import { Logo } from "$lib/components/ui";
import { supabase } from "$lib/supabase";
</script>
<div class="flex flex-col-reverse sm:flex-row min-h-screen">
    <section class="sm:w-1/2 !sm:h-full bg-elevated sm:border-r border-t sm:border-t-transparent border-separator flex flex-col justify-center px-page sm:px-12 items-center sm:items-end">
        <Logo />
    </section>
    <section class="sm:w-1/2 bg-base !sm:h-full h-screen flex flex-col justify-center px-page sm:px-12 items-center sm:items-start">
        <button class="w-full sm:max-w-xs h-12 rounded-md bg-label text-base" on:click={async () => {
            const { data } = await supabase.auth.signInWithOAuth({
                provider: "github",
            });
            console.log(data);
        }}>Continue with GitHub</button>
    </section>
</div>
