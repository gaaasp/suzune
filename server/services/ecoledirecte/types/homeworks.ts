export type APIHomeworks = {
	[date: string]: {
		aFaire: boolean;
		codeMatiere: string;
		documentsAFaire: boolean;
		donneLe: string;
		effectue: boolean;
		idDevoir: number;
		interrogation: boolean;
		matiere: string;
		rendreEnLigne: boolean;
	}[];
};

export type APIDayHomeworks = {
	date: string;
	matieres: {
		entityCode: string;
		entityLibelle: string;
		entityType: string;
		matiere: string;
		codeMatiere: string;
		nomProf: string;
		id: number;
		interrogation: boolean;
		blogActif: boolean;
		nbJourMaxRenduDevoir: number;
		aFaire: {
			idDevoir: number;
			contenu: string;
			rendreEnLigne: boolean;
			donneLe: string;
			effectue: boolean;
			ressource: string;
			ressourceDocuments: any[];
			documents: {
				id: number;
				libelle: string;
				date: string;
				taille: number;
				type: string;
				signatureDemandee: boolean;
				signature: Object;
			}[];

			commentaires: {
				auteur: string;
				date: string;
				id: number;
				idAuteur: number;
				message: string;
				profilAuteur: string;
				supprime: boolean;
			}[];
			elementsProg: any[];
			liensManuel: any[];
			documentsRendus: {
				libelle: string;
				date: string;
				taille: number;
			}[];
			contenuDeSeance: {
				contenu: string;
				documents: {
					id: number;
					libelle: string;
					date: string;
					taille: number;
					type: string;
					signatureDemandee: boolean;
					signature: Object;
				}[];
				commentaires: any[];
			};
			qcm?: {
				idQCM: number;
				idAssociation: number;
				titre: string;
			};
		};
		contenuDeSeance: {
			idDevoir: number;
			contenu: string;
			documents: {
				id: number;
				libelle: string;
				date: string;
				taille: number;
				type: string;
				signatureDemandee: boolean;
				signature: Object;
			}[];
			commentaires: any[];
			elementsProg: any[];
			liensManuel: any[];
		};
	}[];
};
