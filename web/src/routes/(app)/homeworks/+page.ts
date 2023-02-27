import { loadHomeworks } from "$lib/load";

export function load({ fetch }) {
    return loadHomeworks(fetch);
};
