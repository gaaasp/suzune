import FormData from "form-data";
import { lookup } from "mime-types";
import { Account, Document, DocumentData, DocumentFeature, Documents, Id } from "types/index";
import { request } from "./request";
import { APIAccount, APICloudDocument, APIDocument, APIDocuments, Workspaces } from "./types/index";
import { getWorkspaces } from "./utils";

export async function getDocuments(account: Account, token: string, raw: APIAccount, folder?: Id, workspaces?: Workspaces): Promise<{ documents: Documents; workspaces: Workspaces }> {
    if (!workspaces) {
        workspaces = await getWorkspaces(account, token, raw);
    };
    const cloud = folder ? { all: {}, homes: [] } as Documents : await getWorkspace(account, token, "cloud", "Cloud");
    const possibleWorkspaces = workspaces.workspaces.filter(({ options }) => options.documents).map(({ id, ...data }) => ({ ...data, id: `\\${Object.keys(cloud.all)[0]?.split("\\")?.[1]}\\W\\${id}\\` }));
    let workspacesDocuments: Documents = {
        all: {
            "workspaces": {
                id: "workspaces",
                name: "Espaces de travail",
                kind: "folder",
                parents: [],
                children: [...possibleWorkspaces.map(({ id }) => id), cloud.all[Object.keys(cloud.all).sort((a, b) => a.length - b.length)[0]]?.id],
            }
        },
        homes: ["workspaces"]
    };
    possibleWorkspaces.forEach(({ id, name, description, type, options, date, owner, size }) => {
        workspacesDocuments.all[id] = {
            id,
            name,
            kind: "folder",
            description,
            options,
            size,
            date,
            owner,
            type,
            parents: [],
            _raw: workspaces._raw.find(({ id: i }) => i?.toString() === id?.split("\\")?.[3]),
        };
    });

    return {
        workspaces,
        documents:
            folder ?
                folder.toString().indexOf("\\") === -1 ?
                    await getCategories(account, token).then(({ all }) => {
                        let a = {};
                        a[folder] = all[folder];
                        a[folder]?.children?.forEach((child: Id) => {
                            a[child] = all[child];
                        })
                        return { all: a, homes: [] };
                    })
                    : await getWorkspace(account, token, folder, folder.toString().split("\\")[2] === "W" ? workspaces.workspaces.find(({ id }) => id?.toString() === folder.toString().split("\\")[3])?.name : "Cloud")
                : fusion(await getCategories(account, token), fusion(cloud, workspacesDocuments))
    };
};

export async function getDocument(token: string, document: Document): Promise<DocumentData> {
    const splitName = document.name.split(".");
    const extension = (splitName.length === 1 ? "pdf" : splitName[splitName.length - 1]).toLowerCase();
    const fileType = lookup(extension) || { rw3: "application/octet-stream" }[extension] || "text/plain";

    return request<ArrayBuffer>("telechargement", { token, data: `leTypeDeFichier=${document.type === "file" ? "CLOUD": document.type}&fichierId=${document.id}`, method: "POST", type: "arraybuffer" })
        .then((arrayBuffer) => (
            {
                type: fileType,
                name: `${splitName[0]}.${extension}`,
                content: arrayBuffer,
            }
        ));
};

export async function createDocument(token: string, name: string, file: ReadableStream, feature: DocumentFeature, folder?: Id) {
    const fd = new FormData();
    fd.append("data", JSON.stringify({ token, ...(feature === "homeworks" ? { idContexte: folder } : feature === "documents" ? { data: JSON.stringify({ token }) } : {}) }));
    fd.append(
        "file",
        file,
        { filename: name
            .replace(/#|%|{|}|\\|<|>|\*|\?|\/|\$|!|'|"|:|@|\+|`|\||=/g, " ")
            .replace(/\s\s+/g, " ") }
    );

    const mode = feature === "homeworks" ? "CDT" : feature === "documents" ? `CLOUD&dest=${folder}` : "";

    return request(`televersement${mode ? `?mode=${mode}` : ""}`, { token, method: "POST", data: fd });
};

export async function deleteDocument(account: Account, token: string, id: Id) {
    return request(`cloud/${account.type === "TEACHER" ? "P" : account.type === "STAFF" ? "A" : "E"}/${id}`, { token, method: "DELETE", data: { tabNodes: [{ id }] } });
};

export function fusion(a: Documents, b: Documents): Documents {
    return {
        all: { ...a.all, ...b.all },
        homes: [...a.homes, ...b.homes],
    };
};

export async function getCategories(account: Account, token: string): Promise<Documents> {
    const names = {
        administratifs: "Administratif",
        notes: "Bulletins",
        factures: "Factures",
        viescolaire: "Vie scolaire",
        inscriptions: "Inscription",
    };
    return request<APIDocuments>(account.type === "PARENT"  ? "familledocuments" : account.type === "STUDENT" ? "elevesDocuments" : "adultesDocuments", { token })
        .then((categories: APIDocuments) =>
            {
                let all = {};
                let homes = [];

                (Object.entries(categories) as [string, APIDocument[]][])
                    .filter(([id, documents]) => id !== "listesPieceAVerser" && documents.length > 0)
                    .forEach(([id, documents]) => {
                        all[id] = {
                            id,
                            name: names[id],
                            kind: "folder",
                            children: documents.map(({ id }) => id),
                        };
                        documents.forEach(({ id, libelle, date, type }) => {
                            all[id] = {
                                id,
                                name: libelle,
                                kind: "file",
                                type,
                                date: new Date(date),
                            };
                        });
                        homes.push(id);
                    });

                return {
                    all,
                    homes,
                };
            }
        )
};

export async function getWorkspace(account: Account, token: string, folder: Id, name: string): Promise<Documents> {
    const splitFolder = folder.toString().split("\\");
    let [_, _1, t, id, ...folderArr] = splitFolder;
    if (t !== "W") {
        id = "cloud";
    }
    if (splitFolder.length === 1) {
        id = folder.toString();
    }
    return request<[APICloudDocument]>(`cloud/${id === "cloud" ? `${account.type === "STUDENT" || account.type === "PARENT" ? "E" : account.type === "TEACHER" ? "P" : "A"}/${account.id}` : `W/${id}`}?idFolder=${folderArr.length ? encodeURI("\\" + folderArr.join("\\")): "\\"}`, { token })
        .then(([document]) => {
            let all = {};
            function doc(raw: APICloudDocument) {
                raw.children?.forEach(doc);

                let parents = [];
                let idArray = raw.id.split("\\");
                if (raw.type !== "folder") {
                    idArray = ["", ...idArray.slice(4)];
                }
                const firstArray = idArray.findIndex(id => id === "W" || id === "E" || id === "P" || id === "A") + 1;
                for (let i = firstArray; i < idArray.length - 1; i++) {
                    if (idArray[i + 1]) {
                        let id = idArray.slice(0, i + 1).join("\\") + (i === firstArray ? "\\" : "");
                        parents.push({ id, name: (idArray[i] === "" || idArray[i] === "/" || i === firstArray) ? name : idArray[i] });
                    }
                }

                all[raw.id] = {
                    id: raw.id,
                    name: !raw.libelle || (raw.libelle === "/" && (!folderArr.length || (folderArr.length === 1 && folderArr[0] === ""))) ? name : raw.libelle,
                    kind: raw.type === "folder" ? "folder" : raw.url ? "url" : "file",
                    type: raw.type,
                    children: raw.children?.map(({ id }) => id),
                    parents,
                    size: raw.taille,
                    date: new Date(raw.date?.replace(" ", "T")),
                    owner: raw.proprietaire && `${raw.proprietaire.prenom} ${raw.proprietaire.nom}`,
                    _raw: raw,
                } as Document;
            };

            doc(document);

            return { all, homes: [] };
        }
    );
};
