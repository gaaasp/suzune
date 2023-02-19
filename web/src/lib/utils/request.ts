export async function request(path: string, {
    method = "GET",
    data,
    f,
    cookie,
}: { method?: string, data?: any, f?: Function, cookie?: any } = { }) {
    return (f || fetch)(`http://127.0.0.1:3000/${path}?${cookie ? `access-token=${cookie.get("access-token")}&refresh-token=${cookie.get("refresh-token")}` : document.cookie.split("; ").filter(cookie => cookie.startsWith("access-token=") || cookie.startsWith("refresh-token=")).join("&")}`, {
        method,
        credentials: "include",
        headers: {
            ...(data ? { "Content-Type": "application/json" } : {}),
        },
        ...(data ? { body: JSON.stringify(data) } : {})
    }).then((res: any) => res.json());
}
