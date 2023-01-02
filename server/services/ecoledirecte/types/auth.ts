export type LoginParams = {
    username: string;
    password: string;
};

export type APIModule = {
	code: string;
	enable: boolean;
	ordre: number;
	badge: number;
	params: {
		padsActif?: string;
		isActif?: string;
		canParentsLireMessagesEnfants?: string;
		destAdmin?: string;
		destEleve?: string;
		destFamille?: string;
		destProf?: string;
		destEspTravail?: string;
		disabledNotification?: string;
		notificationEmailEtablissement?: string;
		choixMailNotification?: string;
		autreMailNotification?: string;
		mailPro?: string;
		mailPerso?: string;
		messagerieApiVersion?: string;
		blackListProfActive?: string;
		estEnBlackList?: string;
		afficherToutesLesClasses?: string;
		DocumentsNotesActif?: string;
		DocumentsVSActif?: string;
		DocumentsAdministratifActif?: string;
		AnneeArchive?: string;
		compteRenduSeance?: string;
		compteRenduSeancePrevisionnel?: string;
		isCDTPrimaire?: string;
		regime?: string;
		repasmidi_1?: string;
		repassoir_1?: string;
		repasmidi_2?: string;
		repassoir_2?: string;
		repasmidi_3?: string;
		repassoir_3?: string;
		repasmidi_4?: string;
		repassoir_4?: string;
		repasmidi_5?: string;
		repassoir_5?: string;
		repasmidi_6?: string;
		repassoir_6?: string;
		repasmidi_7?: string;
		repassoir_7?: string;
		tabParams?: {
			libelle: string;
			url: string;
		}[];
	};
};

export type APIAccount = {
    idLogin: number;
    id: number;
    uid: string;
    identifiant: string;
    typeCompte: "E" | "P" | "A" | "1" | "2";
    codeOgec: string;
    main: true;
    lastConnexion: string;
    civilite: string;
    prenom: string;
    particule: string;
    nom: string;
    email: string;
    anneeScolaireCourante: string;
    nomEtablissement: string;
    logoEtablissement: string;
    couleurAgendaEtablissement: string;
    dicoEnLigneLeRobert: boolean;
    accessToken: string;
    socketToken: string;
    modules: APIModule[];
    parametresIndividuels: {
        lsuPoilDansLaMainBorne1: string;
        lsuPoilDansLaMainBorne2: string;
        lsuPoilDansLaMainBorne3: string;
        modeCalculLSU: string;
        isQrcode: boolean;
        modeAccessibiliteVisuelle: boolean;
        typeSaisieNotesDefaut: string;
        nbJoursMaxRenduDevoirCDT: string;
        typeViewCDTDefaut: string;
    };
    profile: {
        sexe: "M" | "F";
        infoEDT: string;
        nomEtablissement: string;
        idEtablissement: string;
        rneEtablissement: string;
        telPortable: string;
        email?: string;
        idReelEtab: string;
        photo: string;
        classe: {
            id: number;
            code: string;
            libelle: string;
        };
        eleves?: {
            id: number;
            prenom: string;
            nom: string;
            sexe: "M" | "F";
            infoEDT: string;
            photo: string;
            nomEtablissement: string;
            idEtablissement: string;
            idReelEtab: string;
            modules: APIModule[];
            classe: {
                id: number;
                code: string;
                libelle: string;
                estNote: number;
            };
        }[];
    };
};

export type APILogin = {
	token: string;
	data: {
		accounts: [
            APIAccount
		];
	};
};
