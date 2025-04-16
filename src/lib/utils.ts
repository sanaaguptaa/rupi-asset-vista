
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

// Format numbers as Indian rupees
export function formatRupees(amount: number): string {
  if (amount >= 10000000) {
    // For values >= 10 million
    return `₹${(amount / 10000000).toFixed(2)}`;
  } else if (amount >= 100000) {
    // For values >= 1 lakh
    return `₹${(amount / 100000).toFixed(2)}`;
  } else if (amount >= 1000) {
    // For values >= 1 thousand
    return `₹${(amount / 1000).toFixed(2)}`;
  } else {
    // For smaller values
    return `₹${amount.toLocaleString('en-IN')}`;
  }
}

// Format percentage
export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
