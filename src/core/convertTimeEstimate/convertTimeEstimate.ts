export function convertTimeEstimate(timeEstimate: string): string {
  const minuteEstimate = new Date(Number(timeEstimate)).getMinutes();
  if (!timeEstimate) {
    return '0 sec'
  }
  if (minuteEstimate < 60) {
    return `${minuteEstimate} mins`;
  }
  if (minuteEstimate === 60) {
    return '1 hour';
  }
  if (minuteEstimate < 24 * 60) {
    return `${Math.floor(minuteEstimate / 60)} hours`;
  }
  if (minuteEstimate < 24 * 60 * 7) {
    return `${Math.floor(minuteEstimate / (60 * 24))} days`;
  }
  if (minuteEstimate < 24 * 60 * 30) {
    return `${Math.floor(minuteEstimate / (60 * 24 * 7))} weeks`;
  }
  if (minuteEstimate < 24 * 60 * 30) {
    return `${Math.floor(minuteEstimate / (60 * 24 * 30))} months`;
  }
  return `${Math.floor(minuteEstimate / (60 * 24 * 365))} years`;
}