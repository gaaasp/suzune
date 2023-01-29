import { encrypt } from "utils/encryption";
import { supabase } from "utils/supabase";

export async function createService({ user, type, params: p }) {
    const { iv, params, tag } = encrypt(p);
    const { error } = await supabase
        .from("services")
        .insert({
            type,
            iv,
            params,
            tag,
            user
        });

    return !error;
}

export async function getService(id: string) {
}
