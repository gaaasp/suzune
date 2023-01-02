import { Account, EmojiSubjects, Grade, Grades, Period, Subject } from "types/index";
import { safe } from "utils/index";
import { request } from "./request";
import { APIGrades } from "./types/index";

export async function getGrades(account: Account, token: string): Promise<Grades> {
    let s: EmojiSubjects = {};

    function toNumber(strNum: string) {
        return parseFloat(strNum?.replace(",", "."));
    };
    function nullify(value: number) {
        return isNaN(value) ? null : value;
    };
    function toValue(strNum: string) {
        return nullify(toNumber(strNum));
    };

    function getCoefficient(grades: { meaningful: boolean; coefficient: number}[]): number {
        const valuedGrades = grades.filter(({ meaningful, coefficient }) => meaningful && coefficient > 0);

        return valuedGrades.reduce((sum: number, { coefficient }) => sum + coefficient, 0);
    };

    return request<APIGrades>(`eleves/${account.id}/notes`, { token })
        .then(({ periodes, notes, parametrage }) => {
            const baseDenominator = parametrage.moyenneSur || 20;

            function mean(grades: { meaningful: boolean; coefficient: number; denominator: number; value?: number | string; average?: number; }[], item: "value" | "average" = "value"): number {
                const valuedGrades = grades.filter((grade) => grade.meaningful && grade.coefficient > 0 && typeof grade[item] === "number");
                if (valuedGrades.length === 0) return null;

                return valuedGrades.reduce((sum, grade) => sum + grade.coefficient * (grade[item] as number) * baseDenominator / grade.denominator, 0) / valuedGrades.reduce((sum, { coefficient }) => sum + coefficient, 0);
            };

            let periods: Period[] = periodes
                .filter(({ annuel }) => !annuel)
                .map(({ idPeriode, periode, dateDebut, dateFin, ensembleMatieres, codePeriode }) => {
                    const subjects: Subject[] = ensembleMatieres.disciplines
                        .filter(({ groupeMatiere }) => !groupeMatiere)
                        .map(({ id, discipline, moyenneClasse, moyenneMin, moyenneMax, coef, professeurs, codeMatiere }) => {
                            s = safe(id, discipline, s);
                            return {
                                id,
                                name: s[id].name,
                                emoji: s[id].emoji,
                                value: null,
                                average: toValue(moyenneClasse),
                                max: toValue(moyenneMax),
                                min: toValue(moyenneMin),
                                coefficient: coef,
                                teachers: professeurs.map(({ id, nom }) => ({ id, name: nom })),
                                grades: [],
                                code: codeMatiere,
                            }
                        });

                    return {
                        id: idPeriode,
                        name: periode,
                        subjects,
                        start: new Date(dateDebut),
                        end: new Date(dateFin),
                        value: null,
                        average: toValue(ensembleMatieres.moyenneClasse),
                        min: toValue(ensembleMatieres.moyenneMin),
                        max: toValue(ensembleMatieres.moyenneMax),
                        code: codePeriode,
                        calculation: new Date(ensembleMatieres.dateCalcul),
                    }
                })

            const grades: Grade[] = notes.map(({ devoir, enLettre, valeur, noteSur, maxClasse, minClasse, moyenneClasse, nonSignificatif, coef, codePeriode, codeMatiere, date, dateSaisie }, i) => {
                const period = periods.find(({ code }: any) => code === codePeriode);
                const subject = period?.subjects.find(({ code }: any) => code === codeMatiere);

                return {
                    id: i,
                    name: devoir,
                    value: enLettre && valeur.length === 1 ? valeur : toValue(valeur),
                    denominator: toValue(noteSur),
                    max: toValue(maxClasse),
                    min: toValue(minClasse),
                    average: toValue(moyenneClasse),
                    meaningful: !nonSignificatif && toValue(coef) !== 0,
                    coefficient: toValue(coef) || 0,
                    subject: subject?.id,
                    period: period?.id,
                    date: new Date(date),
                    added: new Date(dateSaisie),
                };
            });

            periods = periods.map((period) => {
                let p = period;
                const pGrades = grades.filter(({ period }) => period === p.id);
                let originalAverages: { [key: string]: number } = {};
                p.subjects = p.subjects.map((subject) => {
                    let s = subject;
                    s.grades = pGrades.filter(({ subject }) => subject === s.id);
                    originalAverages[s.id.toString()] = s.average;
                    s.value = mean(s.grades);
                    if (s.average === null) {
                        s.average = mean(s.grades, "average");
                    } else {
                        const totalCoefficient = getCoefficient(s.grades);
                        const gradesBeforeCalculation = s.grades.filter(({ added }) => added <= p.calculation);
                        const gradesAfterCalculation = s.grades.filter(({ added }) => added > p.calculation);

                        if (totalCoefficient > 0) s.average = (s.average * getCoefficient(gradesBeforeCalculation.filter(({ average }) => typeof average === "number")) + getCoefficient(gradesAfterCalculation.filter(({ average }) => typeof average === "number")) * mean(gradesAfterCalculation, "average")) / totalCoefficient;
                    };
                    return s;
                });

                p.value = mean(p.subjects.map(({ coefficient, value, average }) => ({ coefficient, meaningful: true, denominator: baseDenominator, value, average })));

                const subjectsWithAverage = p.subjects.filter(({ average }) => average != null);
                const subjectsWithOriginalAverage = subjectsWithAverage.filter(({ id }) => originalAverages[id] != null);
                const originalCoefficient = getCoefficient(subjectsWithOriginalAverage.map(({ coefficient }) => ({ coefficient, meaningful: true })));
                const totalCoefficient = getCoefficient(subjectsWithAverage.map(({ coefficient }) => ({ coefficient, meaningful: true })));
                if (totalCoefficient > 0) {
                    p.average = subjectsWithAverage.reduce((sum, { id, average }) => sum + average - (originalAverages[id] || 0), p.average * originalCoefficient) / totalCoefficient;
                }

                return p;
            });

            return { grades, periods, denominator: baseDenominator };
        });
};
