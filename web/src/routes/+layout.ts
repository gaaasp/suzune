import { getSupabase } from "@supabase/auth-helpers-sveltekit";

export async function load(event: any) {
    const { session } = await getSupabase(event);
    return { session };
}
