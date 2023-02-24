export function list(items: string[]) {
    return items?.filter((item) => item).join(" - ") || "";
}