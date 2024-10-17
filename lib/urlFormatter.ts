export function formatURL(input: string): string {
    return input
        .toLowerCase()                        // Convert to lowercase
        .replace(/[^a-z0-9\s]/g, '')          // Remove special characters, keep letters, numbers, and spaces
        .trim()                               // Remove any leading/trailing whitespace
        .replace(/\s+/g, '-')                 // Replace spaces with hyphens
}