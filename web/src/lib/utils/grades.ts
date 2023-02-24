export function formatGrade(value: string | number | undefined, denominator?: number, base?: number): string {
    const formattedGrade = typeof value === "number" ? isNaN(value) ? "--" : value.toLocaleString("fr-FR", {
        maximumFractionDigits: 2,
    }) : value === undefined || value === null ? "--" : value;
    if (!denominator || !base || denominator === base || typeof value !== "number") {
        return formattedGrade;
    } else {
        return `${formatGrade(value * base / denominator)} (${formattedGrade}/${denominator.toLocaleString()})`;
    }
}
