import { request } from "$lib/utils";
import { grades } from "$lib/stores";

export function load({ fetch }) {
    return request("grades", { fetch }).then(grades.set);
}
