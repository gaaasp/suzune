import { grades } from "$lib/stores";
import { request } from "$lib/utils";

export async function load({ fetch }) {
    await request("grades", { fetch }).then(grades.set);
}
