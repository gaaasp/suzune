export type APIRemarks = {
	absencesRetards: Array<{
		aFaire: string;
		commentaire: string;
		date: string;
		dateDeroulement: string;
		displayDate: string;
		id: number;
		idEleve: number;
		justifie: boolean;
		justifieEd: boolean;
		libelle: string;
		motif: string;
		nomEleve: string;
		par: string;
		typeElement: "Absence" | "Retard" | "";
		typeJustification: string;
	}>;
	parametrage: {
		absenceCommentaire: boolean;
		encouragementCommentaire: boolean;
		encouragementParQui: boolean;
		encouragementsVisible: boolean;
		justificationEnLigne: boolean;
		retardCommentaire: boolean;
		sanctionCommentaire: boolean;
		sanctionParQui: boolean;
		sanctionsVisible: boolean;
	};
	sanctionsEncouragements: Array<{
		aFaire: string;
		commentaire: string;
		date: string;
		dateDeroulement: string;
		displayDate: string;
		id: number;
		idEleve: number;
		justifie: boolean;
		justifieEd: boolean;
		libelle: string;
		motif: string;
		nomEleve: string;
		par: string;
		typeElement: "";
		typeJustification: string;
	}>;
};
