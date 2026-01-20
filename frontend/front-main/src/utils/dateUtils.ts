
export function formatDateForBackend(date: Date): string {
    return date.toISOString(); // np. "2025-06-17T20:00:00.000Z"
}


export function parseBackendDate(dateStr: string): Date {
    return new Date(dateStr);
}
