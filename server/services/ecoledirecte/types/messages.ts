export type APIMessages = {
	classeurs: { id: number; libelle: string }[];
	messages: {
		archived: APIMessage[];
		draft: APIMessage[];
		received: APIMessage[];
		sent: APIMessage[];
	};
	pagination: {
		messagesRecusCount: number;
		messagesEnvoyesCount: number;
		messagesArchivesCount: number;
		messagesRecusNotReadCount: number;
	};
	parametrage: {
		isActif: boolean;
		canParentsLireMessagesEnfants: boolean;
		destAdmin: boolean;
		destEleve: boolean;
		destFamille: boolean;
		destProf: boolean;
		destEspTravail: boolean;
		disabledNotification: boolean;
		notificationEmailEtablissement: boolean;
		choixMailNotification: number;
		autreMailNotification: string;
		mailPro: string;
		mailPerso: string;
		messagerieApiVersion: string;
		blackListProfActive: boolean;
		estEnBlackList: boolean;
		afficherToutesLesClasses: boolean;
	};
};

export type APIMessage = {
	answered: boolean;
	brouillon: boolean;
	content: string;
	date: string;
	files: {
		id: number;
		libelle: string;
		date: string;
		type: string;
		signatureDemandee: boolean;
		signature: {};
	}[];
	from: {
		name: string;
		nom: string;
		prenom: string;
		particule: string;
		civilite: string;
		role: "E" | "P" | "A";
		listeRouge: boolean;
		id: number;
		read: boolean;
		fonctionPersonnel: string;
	};
	id: number;
	idClasseur: number;
	idDossier: number;
	mtype: string;
	read: boolean;
	subject: string;
	to: {
		name: string;
		nom: string;
		prenom: string;
		particule: string;
		civilite: string;
		role: "E" | "P" | "A";
		id: number;
		read: boolean;
		to_cc_cci: string;
		fonctionPersonnel: string;
	}[];
	to_cc_cci: string;
	transferred: boolean;
};
