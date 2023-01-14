import { Account, Remark } from "types/index";
import { request } from "./request";
import { APIRemarks } from "./types/index";

export async function getRemarks(account: Account, token: string): Promise<Remark[]> {
    return request<APIRemarks>(`${
        account.type === "TEACHER" ? "enseignants" : account.type === "STAFF" ? "personnels" : "eleves"
    }/${account.id}/viescolaire`, { token }).then(({ absencesRetards, sanctionsEncouragements }) => 
        [
            ...(absencesRetards || []).map(({ id, libelle, displayDate, motif, typeElement, justifie }) => ({ id, title: libelle || displayDate, reason: motif, type: typeElement === "Retard" ? "LATE" : typeElement === "Absence" ? "MISS" : typeElement, punishment: "", justified: justifie, date: displayDate })),
            ...(sanctionsEncouragements || []).map(({ id, libelle, displayDate, dateDeroulement, motif, typeElement, aFaire }) => ({ id, title: libelle || displayDate, reason: motif, type: typeElement, punishment: aFaire, justified: null, date: dateDeroulement })),
        ]
    );
}
