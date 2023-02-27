import { serverURL } from "./urls";

export async function request(path: string, {
    method = "GET",
    data,
    custom,
    fetch: f,
}: { method?: string; data?: any; custom?: boolean; fetch?: Function } = { }) {
    return (f || fetch)(serverURL(path), {
        method,
        credentials: "include",
        headers: {
            ...(data ? { "Content-Type": "application/json" } : {}),
        },
        ...(data ? { body: JSON.stringify(data) } : {})
    }).then((res) => custom ? res : res.json());
}
