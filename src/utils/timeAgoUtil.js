import { formatDistanceToNow, parseISO } from "date-fns";

export function timeAgo(dateString) {
  try {
    const date =
      typeof dateString === "string" ? parseISO(dateString) : dateString;
    return formatDistanceToNow(date, { addSuffix: true });
  } catch (error) {
    console.error("Invalid date passed to timeAgo:", dateString);
    return "Invalid date";
  }
}
