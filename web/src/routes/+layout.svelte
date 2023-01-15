<script lang="ts">
    import { supabase } from "$lib/supabase";
    import { invalidate } from "$app/navigation";
    import { onMount } from "svelte";
    import "../app.css";

    onMount(() => {
        const {
            data: { subscription },
        } = supabase.auth.onAuthStateChange((event, session) => {
            invalidate("supabase:auth");
            if (event === "SIGNED_OUT" || event === "USER_DELETED") {
                const expires = new Date(0).toUTCString()
                document.cookie = `access-token=; path=/; expires=${expires}; SameSite=Lax; secure`
                document.cookie = `refresh-token=; path=/; expires=${expires}; SameSite=Lax; secure`
            } else if (event === "SIGNED_IN" || event === "TOKEN_REFRESHED") {
                const maxAge = 100 * 365 * 24 * 60 * 60 // 100 years, never expires
                document.cookie = `access-token=${session?.access_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
                document.cookie = `refresh-token=${session?.refresh_token}; path=/; max-age=${maxAge}; SameSite=Lax; secure`
            }
        });

        return () => {
            subscription.unsubscribe()
        }
    });
</script>

<slot />
