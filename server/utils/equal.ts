export function isDeepStrictEqual(a: any, b: any) {
    return a === b || (typeof a === "object" && typeof b === "object" && !Object.entries(a).find(([key, value]) => !isDeepStrictEqual(value, b[key])));
}
