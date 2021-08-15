export function capitalize(text: string) {
  return `${text.charAt(0).toUpperCase()}${text.substr(1).toLowerCase()}`;
}
