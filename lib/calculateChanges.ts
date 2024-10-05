import { dummyDashboardCardData } from "@/data/dashboard";

export function calculateChanges(previous: string | number, current: string | number): string {
    // Convert percentage strings to numbers
    if (typeof previous === 'string' && previous.includes('%')) {
        previous = parseFloat(previous.replace('%', ''));
        current = parseFloat((current as string).replace('%', ''));
    } else {
        previous = parseFloat(previous as string);
        current = parseFloat(current as string);
    }

    if (previous === 0) return "N/A"; // Prevent division by zero

    const change = ((current - previous) / previous) * 100;

    // Add "+" sign for positive changes
    const formattedChange = change > 0 ? `+${change.toFixed(2)}%` : `${change.toFixed(2)}%`;

    return formattedChange;
}