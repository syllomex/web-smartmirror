export function capitalize(text: string) {
  return `${text.charAt(0).toUpperCase()}${text.substr(1).toLowerCase()}`;
}

export function plural(texts: [string, string], count: number) {
  return `${count === 1 ? texts[0] : texts[1]}`;
}
