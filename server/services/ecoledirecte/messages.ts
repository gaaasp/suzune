import { Account, Id, Message, Messages, MessageType } from "types/index";
import { request } from "./request";
import { APIMessage, APIMessages } from "./types/index";
import { decodeText } from "./utils";

export async function getMessages(account: Account, token: string, type: MessageType, binder?: Id): Promise<Messages> {
    return request<APIMessages>(`${
        account.type === "PARENT" ? "familles" : account.type === "TEACHER" ? "enseignants" : account.type === "STAFF" ? "personnels" : "eleves"
    }/${
        account.id
    }/messages?orderBy=date&order=desc&idClasseur=${
        binder || 0
    }&typeRecuperation=${
        binder ? "classeur" : type
    }`, { token, method: "GETALL" })
        .then(({ messages, classeurs }) => ({
            binders: classeurs.map(({ id, libelle }) => ({ id, name: libelle })),
            sent: messages.sent.map(message),
            received: messages.received.map(message),
        }));
}

export async function getMessage(account: Account, token: string, id: Id, type: MessageType): Promise<Message> {
    return request<APIMessage>(`${
        account.type === "PARENT" ? "familles" : account.type === "TEACHER" ? "enseignants" : account.type === "STAFF" ? "personnels" : "eleves"
    }/${
        account.id
    }/messages/${id}/${type === "sent" ? "expediteur" : "destinataire"}`, { token }).then(message);
}

function message(raw: APIMessage): Message {
    return {
        id: raw.id,
        title: raw.subject,
        type: raw.mtype === "send" ? "sent" : "received",
        content: raw.content && decodeText(raw.content).replace(/(<[^>]+) style=".*?"/g, "$1").trim(),
        date: new Date(raw.date.replace(" ", "T")),
        binders: [raw.idClasseur],
        author: {
            id: raw.from?.id,
            name: `${raw.from?.prenom} ${raw.from?.nom}`,
        },
        receivers: raw.to?.map(({ id, nom, prenom}) => ({ id, name: `${prenom} ${nom}` })) || [],
        documents: raw.files?.map(({ id, libelle, date, type }) => ({ id, name: libelle, type, kind: "file", date: new Date(date) })) || [],
    };
}

export async function createMessage(account: Account, token: string, { content, title, receivers, documents, reply }: { content: string, title?: string, receivers: { id: Id, group?: Id }[], documents: any[], reply?: Message }) {
    const groups = receivers.reduce((arr, receiver) => receiver.group && (typeof receiver.group !== "string" || (receiver.group.toLowerCase() !== "teachers" && receiver.group.toLowerCase() !== "staff")) && !arr.find((id) => id === receiver.group) ? [...arr, receiver.group] : arr, []);
    const staffMembers = receivers.filter(({ group }) => typeof group === "string" && group?.toLowerCase() === "staff");
    const teachers = receivers.filter(({ group }) => typeof group === "string" && group?.toLowerCase() === "teachers");

    return request(`${
        account.type === "PARENT" ? "familles" : account.type === "TEACHER" ? "enseignants" : account.type === "STAFF" ? "personnels" : "eleves"
    }/${account.id}/messages`, { token, method: "POST", data: { message: {
        content: encodeURIComponent(btoa(content)),
        groupesDestinataires: [
            ...(staffMembers.length ? [{ selection: { type: "A" }, destinataires: staffMembers.map(({ id }) => ({ id })) }]: []),
            ...(teachers.length ? [{ selection: { type: "P", ...(account.classes?.[0]?.id ? { isPP: false, classe: { estNote: 1, id: account.classes[0].id }, classes: [{ estNote: 1, id: account.classes[0].id }] } : {}) }, destinataires: teachers.map(({ id }) => ({ id })) }]: []),
            ...groups.map((g) => ({ selection: { type: "W", espaceTravail: { id: g } }, destinataires: receivers.filter(({ group }) => group === g).map(({ id }) => id) })),
        ],
        subject: reply ? `Re: ${reply.title}` : title,
        brouillon: false,
        files: documents?.map(({ name, unc }) => ({ unc, libelle: name, data: { unc }, code: 200, message: unc })) || [],
        ...(reply ? {
            responseId: reply.id,
            transfertFiles: [],
        } : {}),
    }, anneeMessages: "" } })
}
