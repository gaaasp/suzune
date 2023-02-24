export function formatDate(date: string | Date) {
    date = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    const yesterday = new Date(today);
    yesterday.setDate(yesterday.getDate() - 1);

    function isSameDay(a: Date, b: Date) {
        return a.getDate() === b.getDate() && a.getMonth() === b.getMonth() && a.getFullYear() === b.getFullYear();
    }

    return isSameDay(date, today) ? "Today" : isSameDay(date, yesterday) ? "Yesterday" : isSameDay(date, tomorrow) ? "Tomorrow" : date.toLocaleDateString("fr-FR", {
        weekday: "long",
        day: "numeric",
        month: "short",
        year: date.getFullYear() === today.getFullYear() ? undefined : "numeric",
    });
}
