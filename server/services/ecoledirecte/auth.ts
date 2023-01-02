import { Account } from "types/index";
import { request } from "./request";
import { APILogin, LoginParams } from "./types/index";

export function login({
        username,
        password,
    }: LoginParams): Promise<{ account: Account, token: string, _raw: APILogin["data"]["accounts"][0] }> {
    return request<APILogin>("login", {
        data: {
            identifiant: username,
            motdepasse: password,
        },
        type: "raw",
    }).then(({ data: { accounts: [account] }, token }) => {
        return {
            account: {
                name: `${account.prenom} ${account.nom}`,
                id: account.id,
                type: account.typeCompte === "A" ? "STAFF" : account.typeCompte === "P" ? "TEACHER" : account.typeCompte === "E" ? "STUDENT" : "PARENT",
                schools: [{
                    name: account.nomEtablissement,
                    id: account.profile.idEtablissement,
                }],
                classes: account.profile.classe ? [{
                    name: account.profile.classe.libelle,
                    id: account.profile.classe.id,
                }] : [],
            },
            token,
            _raw: account,
        }
    });
}
