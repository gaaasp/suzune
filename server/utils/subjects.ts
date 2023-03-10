import { Id } from "types/index";

export const subjects = [
    {
        emoji: "ð§®",
        name: "Maths expertes",
        includes: [["math", "expert"]],
    },
    {
        emoji: "ð",
        name: "Maths",
        includes: [["math"]],
    },
    {
        emoji: "ð",
        name: "Car",
        includes: [["transport"]],
    },
    {
        emoji: "ð",
        name: "Sport",
        includes: [["eps"], ["sport"]],
    },
    {
        emoji: "ð¥¼",
        name: "Physique-chimie",
        includes: [["phys"], ["chim"]],
    },
    {
        emoji: "ð§¬",
        name: "SVT",
        includes: [["svt"], ["vie", "ter"]],
    },
    {
        emoji: "ð­",
        name: "Philosophie",
        includes: [["philo"]],
    },
    {
        emoji: "ð¤",
        name: "HLP",
        includes: [["hlp"], ["humanite"]],
    },
    {
        emoji: "ð",
        name: "HGGSP",
        includes: [["hggsp"], ["geopol"]],
    },
    {
        emoji: "ð°",
        name: "Histoire-gÃ©ographie",
        includes: [["hist"], ["geo"]],
    },
    {
        emoji: "âï¸",
        name: "EMC",
        includes: [["emc"], ["moral"]],
    },
    {
        emoji: "â¹ï¸",
        name: "AP",
        includes: [["ap"], ["accompa"]],
    },
    {
        emoji: "ð§ª",
        name: "ENSC",
        includes: [["ensc"], ["enseig", "scien"]],
    },
    {
        emoji: "ð»",
        name: "Technologie",
        includes: [["techno"]],
    },
    {
        emoji: "ð¨",
        name: "Art plastique",
        includes: [["art"]],
    },
    {
        emoji: "ðµ",
        name: "Musique",
        includes: [["musi"]],
    },
    {
        emoji: "ð«",
        name: "Vie de classe",
        includes: [["vie"], ["scol"], ["class"]],
    },
    {
        emoji: "ðï¸",
        name: "Sciences de l'ingÃ©nieur",
        includes: [["scien", "ing"], ["si"]],
    },
    {
        emoji: "ð§âð»",
        name: "NSI",
        includes: [["nsi"], ["numeri"]],
    },
    {
        emoji: "ð",
        name: "AMC",
        includes: [["amc"], ["contemp"]],
    },
    {
        emoji: "ð",
        name: "LLCE",
        includes: [["llce"], ["civil", "etrang"], ["anglais", "spe"], ["anglais", "lit"]],
    },
    {
        emoji: "ð",
        name: "LLCA",
        includes: [["llca"], ["lit", "antiq"]],
    },
    {
        emoji: "ð«ð·",
        name: "FranÃ§ais",
        includes: [["fran"]],
    },
    {
        emoji: "ð¬ð§",
        name: "Anglais",
        includes: [["angl"]],
    },
    {
        emoji: "ðªð¸",
        name: "Espagnol",
        includes: [["espagnol"]],
    },
    {
        emoji: "ð©ðª",
        name: "Allemand",
        includes: [["allemand"]],
    },
    {
        emoji: "ð¨ð³",
        name: "Chinois",
        includes: [["chin"]],
    },
    {
        emoji: "âï¸",
        name: "Latin",
        includes: [["latin"]],
    },
    {
        emoji: "ðï¸",
        name: "Grec",
        includes: [["grec"]],
    },
];

export function safe(id: Id, name: string, s: { [key: string]: { name: string, emoji: string } }) {
    if (!s[id]) {
        const normalizedName = name
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase();

        const subject = subjects.find(
            ({ includes }) => includes.find(
                (intersection) => !intersection.find(
                    (text) => !normalizedName.includes(text)
                )
            )
        );
        s[id] = {
            name: subject?.name || name,
            emoji: subject?.emoji || "ð",
        };
    }
    return s;
};
