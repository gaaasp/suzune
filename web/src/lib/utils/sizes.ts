export function formatSize(size: number | undefined): string {
    if (size) {
        const exponent = Math.floor(Math.log(size || 1) / Math.log(1024));
        const num = size / Math.pow(2, 10 * exponent);
        const symbols = ["o", "ko", "Mo", "Go", "To", "Po", "Eo", "Zo", "Yo"];
        const symbol = symbols[exponent];
        return `${num.toLocaleString("fr-FR", {
            minimumFractionDigits: 0,
            maximumFractionDigits: 2,
        })} ${symbol}`;
    }
    else {
        return "";
    }
}
