export const fileTypeExtensions: Record<string, string[]> = {
  audio: ["mp3", "wav"],
  video: ["mp4"],
  document: ["pdf"],
  image: ["jpg", "png"],
}

export function getExtensionsByType(type: string): string[] {
  return fileTypeExtensions[type] || []
}

export function getFileExtensionFromName(filename: string): string {
  return filename.split(".").pop()?.toLowerCase() || ""
}

export function isValidExtensionForType(type: string, extension: string): boolean {
  return fileTypeExtensions[type]?.includes(extension) || false
}

export function isMatchingExtension(filename: string, selectedExtension: string): boolean {
  const actual = getFileExtensionFromName(filename)
  return actual === selectedExtension.toLowerCase()
}
