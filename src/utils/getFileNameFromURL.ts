export default function getFileNameFromURL(route: string): string {
  const urlParts = route.split("?")[0].split("/");
  const extractedFileName = urlParts[urlParts.length - 1];
  return decodeURIComponent(extractedFileName);
}
