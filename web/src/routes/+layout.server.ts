import { getServerSession } from "@supabase/auth-helpers-sveltekit";

export async function load(event: any) {
    const session = await getServerSession(event);
    return { session };
}
