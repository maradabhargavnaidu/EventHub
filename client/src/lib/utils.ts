import { clsx, type ClassValue } from "clsx";
import { isAfter, isBefore, isWithinInterval, parseISO } from "date-fns";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
export function getStatus(startISO: string, endISO: string): string {
  if (!startISO || !endISO) return "";
  const now = new Date();
  const startDate = parseISO(startISO);
  const endDate = parseISO(endISO);

  if (isBefore(now, startDate)) return "Upcoming";
  if (isAfter(now, endDate)) return "Completed";
  if (isWithinInterval(now, { start: startDate, end: endDate }))
    return "Ongoing";
  return "Unknown";
}

export const getStatusColor = (status: string) => {
  switch (status) {
    case "Ongoing":
      return "bg-green-500/20 text-green-400 border border-green-500/30";
    case "Upcoming":
      return "bg-blue-500/20 text-blue-400 border border-blue-500/30";
    case "cancelled":
      return "bg-red-500/20 text-red-400 border border-red-500/30";
    case "Completed":
      return "bg-gray-500 text-gray-100 border-gray-400";
    default:
      return "bg-gray-500/20 text-gray-400 border border-gray-500/30";
  }
};
