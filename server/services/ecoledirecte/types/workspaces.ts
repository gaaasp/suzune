import { Id } from "types/index";

export type APIWorkspace = {
	agenda: boolean;
	cloud: boolean;
	couleurEvenementAgenda: string;
	creeLe: string;
	creePar: string;
	description: string;
	discussion: boolean;
	droitUtilisateur: number;
	estAdmin: boolean;
	estMembre: boolean;
	id: number;
	nbMembres: number;
	ouvert: boolean;
	public: boolean;
	resume: string;
	salleDesProfs: boolean;
	titre: string;
	type: "LIBRE" | "ORGA";
};

export type APIWorkspaceMember = {
	civilite: string;
	prenom: string;
	particule: string;
	nom: string;
	sexe: string;
	id: number;
	type: "E" | "P" | "A";
	matiere: string;
	photo: string;
	telephone: string;
	email: string;
	estBlackList: boolean;
	isPP: boolean;
	etablissements: any[];
	classe: {
		id: number;
		code: string;
		libelle: string;
	};
	responsable: {
		id: number;
		versQui: string;
		typeResp: string;
		contacts: any[];
	};
	fonction: {
		id: number;
		libelle: string;
	};
};

export type Workspace = {
    id: Id;
    name: string;
    description?: string;
    date?: Date;
    owner: string;
    members: number;
    size?: number;
    max?: number;
    type: string;
    options: {
        schedule: boolean;
        documents: boolean;
        uploadable: boolean;
    };
};

export type Workspaces = {
    workspaces: Workspace[];
    _raw: APIWorkspace[];
};
