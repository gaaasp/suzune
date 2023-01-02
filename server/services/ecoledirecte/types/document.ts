export type APICloudDocument = {
	type: "folder" | "file";
	libelle: string;
	date: string;
	taille: number;
	id: string;
	isLoaded: boolean;
	quota?: number;
	url?: string;
	children?: APICloudDocument[];
	proprietaire?: {
		id: number;
		type: string;
		nom: string;
		prenom: string;
		particule: string;
	};
};

export type APIDocuments = {
	administratifs: APIDocument[];
	factures: APIDocument[];
	inscriptions: APIDocument[];
	listesPiecesAVerser: {
		listesPieces: any[];
		personnes: {
			id: number;
			nom: string;
			prenom: string;
			type: string;
		}[];
		pieces: Array<any>;
	};
	notes: APIDocument[];
	viescolaire: APIDocument[];
};

export type APIDocument = {
	date: string;
	id: number;
	idEleve: number;
	libelle: string;
	signature: Object;
	signatureDemandee: boolean;
	type: string;
};

export type APIWorkspaceDocument = {
	children?: APIWorkspaceDocument[];
	date: string;
	id: string;
	isLoaded: boolean;
	libelle: string;
	quota?: number;
	taille: number;
	type: "folder" | "file";
	proprietaire?: {
		id: number;
		type: string;
		nom: string;
		prenom: string;
		particule: string;
	};
	url?: string;
};

export type APIClassLifeDocument = {
	id: number;
	libelle: string;
	taille: number;
	type: string;
	signatureDemande: boolean;
	signature: Object;
};

export type APIClassLife = {
	classe: string;
	contenu: string;
	idCDT: number;
	profPrincipal: boolean;
	fichiers: APIClassLifeDocument[];
	matieres: {
		libelle: string;
		id: string;
		idCDT: number;
		dateMiseAJour: string;
		contenu: string;
		fichiers: APIClassLifeDocument[];
	}[];
}
