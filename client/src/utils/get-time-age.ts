export function getTimeAgo(isoString: string | null | undefined): string {
  if (!isoString) return "";

  const date = new Date(isoString);
  const now = new Date();
  
  // Calculate difference in seconds
  const diffInSeconds = Math.round((date.getTime() - now.getTime()) / 1000);

  // If the time is in the future or under 10 seconds ago
  if (Math.abs(diffInSeconds) < 10) {
    return "just now";
  }

  // Intervals in seconds
  const units: { unit: Intl.RelativeTimeFormatUnit; seconds: number }[] = [
    { unit: "year", seconds: 31536000 },
    { unit: "month", seconds: 2592000 },
    { unit: "week", seconds: 604800 },
    { unit: "day", seconds: 86400 },
    { unit: "hour", seconds: 3600 },
    { unit: "minute", seconds: 60 },
    { unit: "second", seconds: 1 },
  ];

  const rtf = new Intl.RelativeTimeFormat("en", { numeric: "auto" });

  for (const { unit, seconds } of units) {
    if (Math.abs(diffInSeconds) >= seconds) {
      const delta = Math.round(diffInSeconds / seconds);
      return rtf.format(delta, unit);
    }
  }

  return "just now";
}