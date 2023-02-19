import type { Grades } from "$lib/types";
import { writable } from "svelte/store";

export const integrations = writable([]);
export const homeworks = writable([]);
export const grades = writable<Grades>([]);
export const integration = writable(0);

export function logOut() {
    integrations.set([]);
    homeworks.set([]);
    grades.set([]);
    integration.set(0);
}
