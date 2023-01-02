import { Account, Event } from "types/index";
import { safe } from "utils/index";
import { request } from "./request";
import { APIEvents } from "./types/index";

export async function getEvents(account: Account, token: string, start: string, end: string): Promise<Event[]> {
    let s = {};
    return request<APIEvents>(`${account.type === "TEACHER" ? "P" : account.type === "STAFF" ? "A" : "E"}/${account.id}/emploidutemps`, { token, data: { dateDebut: start, dateFin: end, avecTrous: false } })
        .then((events) => events
            .filter(({ id }) => id !== 0)
            .map(({ id, typeCours, start_date, end_date, prof, salle, text, matiere, codeMatiere, isAnnule }) => {
                s = safe(codeMatiere, matiere, s);
                return {
                    id,
                    type: codeMatiere === "DST" ? "EXAM" : typeCours === "COURS" ? "LESSON" : "SPECIAL",
                    start: new Date(start_date.replace(" ", "T")),
                    end: new Date(end_date.replace(" ", "T")),
                    teacher: prof,
                    room: salle,
                    title: text,
                    subject: {
                        name: s[codeMatiere].name,
                        emoji: s[codeMatiere].emoji
                    },
                    options: {
                        cancelled: isAnnule,
                    },
                };
            })
        );
};
