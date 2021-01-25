export const checkSlash = (text: string): string =>
  text.startsWith('/') ? text : '/' + text;
