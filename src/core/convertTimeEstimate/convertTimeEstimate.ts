export function convertTimeEstimate(timeEstimate: string): string {
  const minuteEstimate = new Date(Number(timeEstimate)).getMinutes();
  if (minuteEstimate < 60) {
    return `${minuteEstimate} mins`;
  }
  if (minuteEstimate === 60) {
    return '1 hour';
  }
  return `${Math.floor(minuteEstimate / 60)} hours`;
}