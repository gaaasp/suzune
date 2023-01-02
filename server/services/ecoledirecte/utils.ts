import { Account } from "types/index";
import { request } from "./request";
import { APIAccount, APIWorkspace, Workspaces } from "./types/index";

export async function getWorkspaces(account: Account, token: string, raw: APIAccount): Promise<Workspaces> {
    return request<APIWorkspace[]>(`${raw.typeCompte}/${account.id}/espacestravail`, { token })
        .then((workspaces) => 
            ({
                workspaces: workspaces
                    .map(({ id, titre, resume, creeLe, creePar, type, nbMembres, agenda, cloud, droitUtilisateur }) => ({
                        id,
                        name: titre,
                        description: resume && decodeText(resume),
                        type,
                        date: creeLe ? new Date(
                            creeLe.split("/")[2].slice(0, 4) +
                            "-" +
                            creeLe.split("/")[1] +
                            "-" +
                            creeLe.split("/")[0] +
                            "T" +
                            creeLe.split("/")[2].slice(7, 12)
                        ) : null,
                        owner: creePar,
                        members: nbMembres,
                        options: {
                            schedule: agenda,
                            documents: cloud,
                            uploadable: droitUtilisateur === 2,
                        },
                    }))
                    .sort((a, b) =>
                        a.type === b.type
                        ? a.name.localeCompare(b.name)
                        : a.type === "LIBRE"
                        ? 1
                        : -1),
                _raw: workspaces,
            })
        );
}

export function decodeText(text: string) {
    return decodeURIComponent(escape(atob(text)))
		.replaceAll("color:#000000;", "")
		.replaceAll('color="#000000"', "")
		.replaceAll("color: #000000;", "")
		.replaceAll("color: rgb(0, 0, 0);", "")
		.replaceAll('color="rgb(0, 0, 0)"', "")
		.replaceAll("color:rgb(0, 0, 0);", "");
};
