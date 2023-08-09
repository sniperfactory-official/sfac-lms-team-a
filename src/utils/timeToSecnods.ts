export default function timeToSeconds(time: string) {
  const timeParts = time.split(":").map(part => parseInt(part.trim(), 10));

  let seconds = 0;

  if (timeParts.length === 3) {
    // "HH:MM:SS" 형식
    seconds = timeParts[0] * 3600 + timeParts[1] * 60 + timeParts[2];
  } else if (timeParts.length === 2) {
    // "MM:SS" 형식
    seconds = timeParts[0] * 60 + timeParts[1];
  } else if (timeParts.length === 1) {
    // "SS" 형식
    seconds = timeParts[0];
  }

  return seconds;
}
