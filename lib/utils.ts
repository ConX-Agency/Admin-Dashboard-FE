import { ApiError } from "@/data/error";
import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseDate = (dateString: string) => {
  const [day, month, year] = dateString.split("/").map(Number); // Split "14/10/2024" into [14, 10, 2024]
  return new Date(year, month - 1, day); // Months are 0-indexed in JavaScript's Date object, fixed by substracting 1
};

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

export function formatURL(input: string): string {
  return input
    .toLowerCase()                        // Convert to lowercase
    .replace(/[^a-z0-9\s]/g, '')          // Remove special characters, keep letters, numbers, and spaces
    .trim()                               // Remove any leading/trailing whitespace
    .replace(/\s+/g, '-')                 // Replace spaces with hyphens
}

export function formatFollowerCount(count: number): string {
  if (count >= 1_000_000) {
    return (count / 1_000_000).toFixed(1).replace(/\.0$/, "") + "M";
  } else if (count >= 1_000) {
    return (count / 1_000).toFixed(1).replace(/\.0$/, "") + "K";
  }
  return count.toString();
}

export function getFollowerCount(platforms: string[]) {
  // Need to Add this.
}

export function capitalizeFirstLetter(str: string): string {
  if (!str) return "";
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export function handleApiError(error: unknown) {
  if (error instanceof ApiError) {
    const { status, message } = error;
    toast({
      title: 'An error has occured!',
      description: `Status: ${status}; Message: ${message}`,
      variant: 'destructive',
      duration: 3000,
    });
  }
}

export function formatInfluencerCategory(follower_count: number): string {
  if (follower_count < 10_000) {
    return "Nano";
  } else if (follower_count < 100_000) {
    return "Micro";
  } else if (follower_count < 1_000_000) {
    return "Macro";
  } else {
    return "Undecided";
  }
}
