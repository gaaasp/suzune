import { Account, Homework, HomeworkStatus, Id } from "types/index";
import { safe } from "utils/index";
import { request } from "./request";
import { APIDayHomeworks, APIHomeworks } from "./types/index";
import { decodeText } from "./utils";

export async function getHomeworks(account: Account, token: string, start?: string, end?: string): Promise<Homework[]> {
    if (start && end) {
        let homeworks = [];
        for (let day = new Date(start); day <= new Date(end); day.setDate(day.getDate() + 1)) {
            let h = await getDayHomeworks(account, token, day.toISOString().split("T")[0]);
            homeworks = [...homeworks, ...h];
        };
        return homeworks;
    }
    else return getHomeworksSummary(account, token);
};

export async function editHomework(account: Account, token: string, id: Id, { status }: { status: HomeworkStatus }) {
    return request(`Eleves/${account.id}/cahierdetexte`, {
        method: "PUT",
        token,
        data: { [status === "DONE" ? "idDevoirsEffectues" : "idDevoirsNonEffectues"]: [{ id }] },
    });
};

async function getDayHomeworks(account: Account, token: string, day: string): Promise<Homework[]> {
    let s = {};
    return request<APIDayHomeworks>(`Eleves/${account.id}/cahierdetexte/${day}`, { token })
        .then(({ date, matieres }) => matieres.map(({ id, codeMatiere, matiere, aFaire, interrogation, contenuDeSeance, nomProf }) => {
            s = safe(codeMatiere, matiere, s);

            return {
                id,
                content: aFaire?.contenu ? decodeText(aFaire.contenu.endsWith("+") ? aFaire.contenu.slice(0, -2) : aFaire.contenu) : null,
                session: [contenuDeSeance?.contenu, aFaire?.contenuDeSeance?.contenu]
                    .filter((a) => a)
                    .map((t) => decodeText(t))
                    .join("\n<br />"),
                date: new Date(date),
                added: new Date(aFaire?.donneLe || date),
                documents: [
                    ...(aFaire?.documents || []),
                    ...(aFaire?.contenuDeSeance?.documents || []),
                    ...(contenuDeSeance?.documents || []),
                ].map(({ id, libelle, type, taille, date }) => ({ id, name: libelle, kind: "file", type, size: taille, date: new Date(`${date.slice(0, 4)}-${date.slice(4, 6)}-${date.slice(6, 8)}`) })),
                teacher: nomProf.slice(5),
                subject: {
                    name: s[codeMatiere].name,
                    emoji: s[codeMatiere].emoji,
                },
                status: aFaire?.effectue ? "DONE" : aFaire ? "TODO" : "DISABLED",
                options: {
                    uploadable: !!aFaire?.rendreEnLigne,
                    exam: interrogation,
                },
                returned: aFaire?.documentsRendus?.map(({ libelle, date, taille }) => ({ name: libelle, date: new Date(date.replace(" ", "T")), size: taille })) || [],
                comments: aFaire?.commentaires?.map(({ id, auteur, message, date }) => ({ id, author: auteur, content: message && decodeText(message), date: new Date(date) })) || [],
            } as Homework;
        }).filter(({ content, session, documents, options }) => content || session || documents?.length || options?.uploadable));
}

async function getHomeworksSummary(account: Account, token: string): Promise<Homework[]> {
    return request<APIHomeworks>(`Eleves/${account.id}/cahierdetexte`, { token }).then(async (data) => {
        let homeworks = [];
        await Promise.all(
            Object.keys(data)
                .map(
                    (day) => getDayHomeworks(account, token, day).then((h) => {
                        homeworks = [...homeworks, ...h]
                    })
                )
        );
        return homeworks;
    });
}
