import { Id } from "types/index";

export const subjects = [
    {
        emoji: "🧮",
        name: "Maths expertes",
        includes: [["math", "expert"]],
    },
    {
        emoji: "📐",
        name: "Maths",
        includes: [["math"]],
    },
    {
        emoji: "🚌",
        name: "Car",
        includes: [["transport"]],
    },
    {
        emoji: "🏃",
        name: "Sport",
        includes: [["eps"], ["sport"]],
    },
    {
        emoji: "🥼",
        name: "Physique-chimie",
        includes: [["phys"], ["chim"]],
    },
    {
        emoji: "🧬",
        name: "SVT",
        includes: [["svt"], ["vie", "ter"]],
    },
    {
        emoji: "💭",
        name: "Philosophie",
        includes: [["philo"]],
    },
    {
        emoji: "🤔",
        name: "HLP",
        includes: [["hlp"], ["humanite"]],
    },
    {
        emoji: "🌍",
        name: "HGGSP",
        includes: [["hggsp"], ["geopol"]],
    },
    {
        emoji: "🏰",
        name: "Histoire-géographie",
        includes: [["hist"], ["geo"]],
    },
    {
        emoji: "⚖️",
        name: "EMC",
        includes: [["emc"], ["moral"]],
    },
    {
        emoji: "ℹ️",
        name: "AP",
        includes: [["ap"], ["accompa"]],
    },
    {
        emoji: "🧪",
        name: "ENSC",
        includes: [["ensc"], ["enseig", "scien"]],
    },
    {
        emoji: "💻",
        name: "Technologie",
        includes: [["techno"]],
    },
    {
        emoji: "🎨",
        name: "Art plastique",
        includes: [["art"]],
    },
    {
        emoji: "🎵",
        name: "Musique",
        includes: [["musi"]],
    },
    {
        emoji: "🏫",
        name: "Vie de classe",
        includes: [["vie"], ["scol"], ["class"]],
    },
    {
        emoji: "🏗️",
        name: "Sciences de l'ingénieur",
        includes: [["scien", "ing"], ["si"]],
    },
    {
        emoji: "🧑‍💻",
        name: "NSI",
        includes: [["nsi"], ["numeri"]],
    },
    {
        emoji: "💂",
        name: "AMC",
        includes: [["amc"], ["contemp"]],
    },
    {
        emoji: "💂",
        name: "LLCE",
        includes: [["llce"], ["civil", "etrang"], ["anglais", "spe"], ["anglais", "lit"]],
    },
    {
        emoji: "📖",
        name: "LLCA",
        includes: [["llca"], ["lit", "antiq"]],
    },
    {
        emoji: "🇫🇷",
        name: "Français",
        includes: [["fran"]],
    },
    {
        emoji: "🇬🇧",
        name: "Anglais",
        includes: [["angl"]],
    },
    {
        emoji: "🇪🇸",
        name: "Espagnol",
        includes: [["espagnol"]],
    },
    {
        emoji: "🇩🇪",
        name: "Allemand",
        includes: [["allemand"]],
    },
    {
        emoji: "🇨🇳",
        name: "Chinois",
        includes: [["chin"]],
    },
    {
        emoji: "✝️",
        name: "Latin",
        includes: [["latin"]],
    },
    {
        emoji: "🏛️",
        name: "Grec",
        includes: [["grec"]],
    },
];

export function safe(id: Id, name: string, s: { [key: string]: { name: string, emoji: string } }) {
    if (!s[id]) {
        const subject = subjects.find(
            ({ includes }) => includes.find(
                (intersection) => !intersection.find(
                    (text) => !name
                        .normalize("NFD")
                        .replace(/[\u300-\u36f]/g, "")
                        .toLowerCase()
                        .includes(text)
                )
            )
        );
        s[id] = {
            name: subject?.name || name,
            emoji: subject?.emoji || "",
        };
    }
    return s;
};
