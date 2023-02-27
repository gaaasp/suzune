import { serverURL } from "./urls";

export async function request(path: string, {
    method = "GET",
    data,
    custom
}: { method?: string, data?: any, custom?: boolean } = { }) {
    return fetch(serverURL(path), {
        method,
        headers: {
            ...(data ? { "Content-Type": "application/json" } : {}),
            "X-Auth-Token": decodeURIComponent(document.cookie.split("; ").find(cookie => cookie.startsWith("supabase-auth-token="))?.split("=")[1] || ""),
        },
        ...(data ? { body: JSON.stringify(data) } : {})
    }).then((res) => custom ? res : res.json());
}
