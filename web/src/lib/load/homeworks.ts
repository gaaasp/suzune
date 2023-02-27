import { documents, homeworks } from "$lib/stores";
import type { Homeworks, ServerHomeworks } from "$lib/types";
import type { Homework } from "$lib/types/homeworks";
import { request } from "$lib/utils";

export async function loadHomeworks(fetch: Function, start: string = "", end: string = "") {
    return request(`homeworks?start=${start}&end=${end}`, { fetch }).then((integrations: ServerHomeworks) => {
        const h = integrations.reduce(
            (homeworks, { data, ...integration }) => [
                ...homeworks,
                ...data.map((homework: Homework) => ({ homework, integration }))
            ],
            [] as Homeworks
        );
        documents.update(d => {
            if (!d) {
                d = [];
            }
            integrations.forEach(({ data, ...integration }) => {
                data.forEach(({ documents }) => {
                    documents.forEach(document => {
                        const i = d.find(({ id }) => id === integration.id);
                        d = [
                            ...d.filter(({ id }) => id !== integration.id),
                            i?.data?.all ? { ...i, data: { ...i.data, all: { ...i.data.all, [document.id]: document } } } : { ...integration, data: { all: { [document.id]: document }, homes: [] } }
                        ];
                    })
                })
            })
            return d;
        })
        homeworks.update(old => [...(old || []).filter(({ homework, integration }) => !integrations.find(i => integration.id === i.id)?.data.find(({ id }) => id === homework.id)), ...h]);
    });
}
