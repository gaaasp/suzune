import { Binder, Id } from "types/index";
import { request } from "./request";

export async function createBinder(token: string, { name }: { name: string }) {
    return request("messagerie/classeurs", { token, method: "POST", data: { libelle: name } });
};

export async function editBinder(token: string, { name, id }: Binder) {
    return request(`messagerie/classeur/${id}`, { token, method: "PUT", data: { id, libelle: name } });
};

export async function deleteBinder(token: string, id: Id) {
    return request(`messagerie/classeur/${id}`, { token, method: "DELETE" });
};
