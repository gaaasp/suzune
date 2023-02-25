import type { Grades, Homeworks } from "$lib/types";
import { writable } from "svelte/store";

export const integrations = writable([]);
export const homeworks = writable<Homeworks>([]);
export const grades = writable<Grades>();
export const integration = writable(0);
export const period = writable<number>();

export function logOut() {
    integrations.set([]);
    homeworks.set([]);
    grades.set([]);
    integration.set(0);
    period.set(0);
}
