import { supabase } from "utils/index";
import { Id } from "types/index";

export async function createIntegration({ user, service, params }) {
    const { error } = await supabase
        .from("integrations")
        .insert({
            params,
            service,
            user_id: user
        });

    return !error;
}

export async function getIntegrations(user: Id) {
    const { data, error } = await supabase
        .from("integrations")
        .select()
        .eq("user_id", user);

    if (error) {
        return [];
    } else {
        return data;
    };
}
