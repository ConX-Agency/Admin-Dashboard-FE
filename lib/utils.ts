import { ApiError } from "@/data/error";
import { toast } from "@/hooks/use-toast";
import { clsx, type ClassValue } from "clsx"
import { FieldErrors, UseFormTrigger } from "react-hook-form";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const parseDate = (date: Date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1; // Months are 0-indexed in JavaScript's Date object, add 1 to match human-readable format
  const day = date.getDate();
  return `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`; // Format as "YYYY-MM-DD"
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

export const handleValidation = async (trigger: UseFormTrigger<any>, errors: FieldErrors<any>) => {
  const isValid = await trigger();

  if (!isValid) {
    const displayErrorMessages = (fieldErrors: any) => {
      Object.values(fieldErrors).forEach((error: any) => {
        if (error?.message) {
          // Display error message directly
          toast({
            title: 'Validation Error',
            description: error.message,
            variant: 'destructive',
            duration: 3000,
          });
        } else if (Array.isArray(error)) {
          // Recursively handle arrays (e.g., platforms)
          error.forEach((nestedError) => displayErrorMessages(nestedError));
        } else if (typeof error === 'object') {
          // Recursively handle nested objects
          displayErrorMessages(error);
        }
      });
    };

    displayErrorMessages(errors); // Start processing the errors object
  }
};
