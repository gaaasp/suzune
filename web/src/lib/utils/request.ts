export async function request(path: string, {
    method = "GET",
    data,
    f,
    cookie,
}: { method?: string, data?: any, f?: Function, cookie?: any } = { }) {
    return (f || fetch)(`http://192.168.1.24:3000/${path}`, {
        method,
        headers: {
            ...(data ? { "Content-Type": "application/json" } : {}),
            "X-Auth-Token": decodeURIComponent(document.cookie.split("; ").find(cookie => cookie.startsWith("supabase-auth-token="))?.split("=")[1] || ""),
        },
        ...(data ? { body: JSON.stringify(data) } : {})
    }).then((res: any) => res.json());
}
